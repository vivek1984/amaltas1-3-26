<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Google Tag Manager --}}
    <script>
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-M2TSDNG');
    </script>

    <meta name="csrf-token" content="{{ csrf_token() }}">

    {{-- Default Title --}}
    <title inertia>{{ config('app.name', 'Amaltas Furniture') }}</title>

    {{-- ============================= --}}
    {{-- 🔥 SERVER SIDE OG TAGS START --}}
    {{-- ============================= --}}

    @php
        $product = $page['props']['product'] ?? null;
        $group = $page['props']['group'] ?? null;
        $cluster = $page['props']['cluster'] ?? null;

        $ogImagePath = 'images/showroom.jpg';
        $ogTitle = 'Amaltas Furniture';
        $ogDescription = 'Premium furniture and Modular Kitchens collection.';
        $ogType = 'website';

        if ($product) {
            $ogTitle = ($product['name'] ?? 'Product') . ' | Amaltas Furniture';
            $ogDescription = $product['description'] ?? 'Premium quality product from Amaltas Furniture';
            $ogType = 'product';

            if (!empty($product['images']) && isset($product['images'][0]['name'])) {
                $ogImagePath = 'storage/' . $product['images'][0]['name'];
            } elseif (!empty($product['small_image'])) {
                $ogImagePath = 'storage/' . $product['small_image'];
            }
        } elseif ($group) {
            $ogTitle = ($group['name'] ?? 'Category') . ' | Amaltas Furniture';
            $ogDescription = $group['description'] ?? 'Explore furniture categories by Amaltas Furniture.';
            $ogType = 'website';

            if (!empty($group['image'])) {
                $ogImagePath = 'storage/' . $group['image'];
            }
        } elseif ($cluster) {
            $ogTitle = ($cluster['name'] ?? 'Collection') . ' | Amaltas Furniture';
            $ogDescription = $cluster['description'] ?? 'Explore furniture collections by Amaltas Furniture.';
            $ogType = 'website';

            if (!empty($cluster['image'])) {
                $ogImagePath = 'storage/' . $cluster['image'];
            }
        }

        $ogImage = asset($ogImagePath);
        $ogImageWidth = 1200;
        $ogImageHeight = 630;
        $ogImageType = null;

        $imageAbsolutePath = public_path($ogImagePath);
        if (is_file($imageAbsolutePath)) {
            $imageSize = @getimagesize($imageAbsolutePath);
            if ($imageSize !== false) {
                $ogImageWidth = (int) ($imageSize[0] ?? $ogImageWidth);
                $ogImageHeight = (int) ($imageSize[1] ?? $ogImageHeight);
                $ogImageType = $imageSize['mime'] ?? null;
            }
        }

        $ogDescription = \Illuminate\Support\Str::limit(strip_tags((string) $ogDescription), 160);
    @endphp

    <meta property="og:title" content="{{ $ogTitle }}">
    <meta property="og:description" content="{{ $ogDescription }}">
    <meta property="og:type" content="{{ $ogType }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:secure_url" content="{{ $ogImage }}">
    <meta property="og:image:width" content="{{ $ogImageWidth }}">
    <meta property="og:image:height" content="{{ $ogImageHeight }}">
    @if($ogImageType)
        <meta property="og:image:type" content="{{ $ogImageType }}">
    @endif

    {{-- Twitter Support --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $ogTitle }}">
    <meta name="twitter:description" content="{{ $ogDescription }}">
    <meta name="twitter:image" content="{{ $ogImage }}">

    {{-- ============================= --}}
    {{-- 🔥 SERVER SIDE OG TAGS END --}}
    {{-- ============================= --}}

     
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />
    <link rel="icon" href="/favicon.ico">

<!--    @routes  -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])

    {{-- Inertia head (for normal title updates etc.) --}}
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>
</html>
