$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$inputDir = Join-Path $scriptDir "Original"
$outputDir = Join-Path $scriptDir "Gallery"

if (-not (Test-Path $inputDir)) {
    Write-Host "Error: Input directory not found: $inputDir"
    exit 1
}

New-Item -ItemType Directory -Force $outputDir | Out-Null

$extensions = @('.jpg', '.jpeg', '.png')
$files = Get-ChildItem -LiteralPath $inputDir -File | Where-Object { $extensions -contains $_.Extension.ToLower() }

$total = @($files).Count
$converted = 0
$skipped = 0

Write-Host "Found $total image(s) in Original/"
Write-Host ""

foreach ($file in $files) {
    $outputFile = Join-Path $outputDir ([System.IO.Path]::ChangeExtension($file.Name, ".webp"))

    if (Test-Path -LiteralPath $outputFile) {
        Write-Host "[SKIP] $($file.Name)  (already exists)"
        $skipped++
        continue
    }

    Write-Host -NoNewline "Converting: $($file.Name) ... "

    $result = & magick $file.FullName `
        -auto-orient `
        -strip `
        -resize "2560x2560>" `
        -quality 90 `
        -define webp:lossless=true `
        -define webp:method=2 `
        $outputFile 2>&1

    if ($LASTEXITCODE -eq 0) {
        $inSize = [math]::Round($file.Length / 1KB, 1)
        $outSize = [math]::Round((Get-Item -LiteralPath $outputFile).Length / 1KB, 1)
        Write-Host "OK  ($inSize KB -> $outSize KB)"
        $converted++
    } else {
        Write-Host "FAILED: $result"
    }
}

Write-Host ""
Write-Host "Done: $converted converted, $skipped skipped"
