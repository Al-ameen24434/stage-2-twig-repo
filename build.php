<?php
// build.php - Works on Windows, Linux, macOS
require 'vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Setup Twig
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader, ['cache' => false]);

// Output directory
$outputDir = __DIR__ . '/public';
if (!is_dir($outputDir)) {
    mkdir($outputDir, 0755, true);
}

// All pages to generate
$pages = [
    'landing'   => ['template' => 'landing.html.twig',   'file' => 'index.html'],
    'login'     => ['template' => 'login.html.twig',     'file' => 'login.html'],
    'signup'    => ['template' => 'signup.html.twig',    'file' => 'signup.html'],
    'dashboard' => ['template' => 'dashboard.html.twig', 'file' => 'dashboard.html'],
    'tickets'   => ['template' => 'tickets.html.twig',   'file' => 'tickets.html'],
];

// Render each page
foreach ($pages as $key => $page) {
    $html = $twig->render($page['template'], [
        'page' => $key,
        'app_name' => 'TicketFlow',
        'year' => date('Y'),
    ]);
    file_put_contents("$outputDir/{$page['file']}", $html);
    echo "Generated: {$page['file']}\n";
}

// === Copy assets (cross-platform) ===
$assets = ['assets', 'js', 'images'];
foreach ($assets as $dir) {
    if (is_dir($dir)) {
        $target = "$outputDir/" . basename($dir);
        if (!is_dir($target)) {
            mkdir($target, 0755, true);
        }

        // Use PHP's built-in copy (no shell commands)
        $files = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($dir, RecursiveDirectoryIterator::SKIP_DOTS),
            RecursiveIteratorIterator::SELF_FIRST
        );

        foreach ($files as $file) {
            $dest = $target . '/' . $files->getSubPathName();
            if ($file->isDir()) {
                if (!is_dir($dest)) mkdir($dest, 0755, true);
            } else {
                copy($file->getRealPath(), $dest);
            }
        }
        echo "Copied: $dir → public/" . basename($dir) . "\n";
    }
}

echo "\nBuild complete! Output: public/\n";
echo "Open: public/index.html\n";