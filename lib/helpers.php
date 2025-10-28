<?php

/**
 * Helper functions for the Twig/PHP version
 * Note: Most logic is handled client-side with JavaScript
 */

function getCurrentPage() {
    return $_GET['page'] ?? 'landing';
}

function getBaseUrl() {
    $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
    $host = $_SERVER['HTTP_HOST'];
    return $protocol . '://' . $host;
}

function buildUrl($page) {
    return '?page=' . urlencode($page);
}
