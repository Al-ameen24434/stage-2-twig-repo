<?php
require_once __DIR__ . '/vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Initialize Twig
$loader = new FilesystemLoader(__DIR__ . '/templates');
$twig = new Environment($loader, [
    'cache' => false,
    'debug' => true,
]);

// Simple routing based on query parameter
$page = $_GET['page'] ?? 'landing';

// Map routes to templates
$routes = [
    'landing' => 'landing.html.twig',
    'login' => 'login.html.twig',
    'signup' => 'signup.html.twig',
    'dashboard' => 'dashboard.html.twig',
    'tickets' => 'tickets.html.twig',
];

// Get template or default to landing
$template = $routes[$page] ?? $routes['landing'];

// Render template
try {
    echo $twig->render($template, [
        'page' => $page,
        'app_name' => 'TicketFlow',
        'year' => date('Y'),
    ]);
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
