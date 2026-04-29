<?php

require __DIR__ . '/vendor/autoload.php';

use Slim\Factory\AppFactory;
use App\Middleware\CorsMiddleware;

$app = AppFactory::create();

// Middleware (like express.json())
$app->addBodyParsingMiddleware();
$app->add(new CorsMiddleware());

$app->options('/{routes:.+}', function ($request, $response) {
    return $response;
});

// Helper function
function validateNumbers($a, $b)
{
    return is_numeric($a) && is_numeric($b);
}

$app->get('/', function ($request, $response) {
    $payload = [
        'name' => 'My Demo API',
        'version' => '1.0.0',
        'status' => 'running',
        'endpoints' => [
            'GET /add',
            'POST /add'
        ]
    ];

    $response->getBody()->write(json_encode($payload));
    return $response->withHeader('Content-Type', 'application/json');
});

// GET /add?a=1&b=2
$app->get('/add', function ($request, $response) {
    $params = $request->getQueryParams();

    $a = floatval($params['a'] ?? null);
    $b = floatval($params['b'] ?? null);

    if (!validateNumbers($a, $b)) {
        $response->getBody()->write(json_encode([
            "error" => "Both values must be numbers"
        ]));
        return $response->withStatus(400)
            ->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode([
        "result" => $a + $b
    ]));

    return $response->withHeader('Content-Type', 'application/json');
});

// POST /add
$app->post('/add', function ($request, $response) {
    $data = $request->getParsedBody();

    $a = $data['a'] ?? null;
    $b = $data['b'] ?? null;

    print "Received POST data: " . json_encode($data) . "\n";

    if (!validateNumbers($a, $b)) {
        $response->getBody()->write(json_encode([
            "error" => "Both values must be numbers"
        ]));
        return $response->withStatus(400)
            ->withHeader('Content-Type', 'application/json');
    }

    $response->getBody()->write(json_encode([
        "result" => $a + $b
    ]));

    return $response->withHeader('Content-Type', 'application/json');
});

$app->get('/random', function ($request, $response) {
    $params = $request->getQueryParams();

    $min = $params['min'] ?? 0;
    $max = $params['max'] ?? 1;
    $response->getBody()->write(json_encode([
        'result'=> random_int($min, $max)
    ]));

    return $response->withHeader('Content-Type', 'application/json');
});

$app->run();