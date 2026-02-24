<!--<!DOCTYPE html>-->
<!--<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">-->
<!--    <head>-->
<!--        <meta charset="utf-8">-->
<!--        <meta name="viewport" content="width=device-width, initial-scale=1">-->
        
<!--        <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':-->
<!--        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],-->
<!--        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=-->
<!--        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);-->
<!--        })(window,document,'script','dataLayer','GTM-M2TSDNG');</script>-->
        
        
<!--        <meta name="csrf-token" content="{{ csrf_token() }}">-->

<!--        <title inertia>{{ config('app.name', 'Amaltas') }}</title>-->

<!--         Fonts -->
<!--        <link rel="preconnect" href="https://fonts.bunny.net">-->
<!--        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />-->
<!--        <link rel="icon" href="/favicon.ico">-->

<!--         Scripts -->
<!--        @routes-->
<!--        @viteReactRefresh-->
<!--        @vite(['resources/js/app.jsx'])-->

        
<!--        @inertiaHead-->
<!--    </head>-->
<!--    <body class="font-sans antialiased">-->
<!--        @inertia-->
<!--    </body>-->
<!--</html>-->



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
    @endphp

    @if($product)
        @php
            $image = null;

            if (!empty($product['images']) && isset($product['images'][0]['name'])) {
                $image = asset('storage/' . $product['images'][0]['name']);
            } elseif (!empty($product['small_image'])) {
                $image = asset('storage/' . $product['small_image']);
            }

            $description = $product['description'] ?? 'Premium quality product from Amaltas Furniture';
        @endphp

        <meta property="og:title" content="{{ $product['name'] }} | Amaltas Furniture">
        <meta property="og:description" content="{{ Str::limit(strip_tags($description), 160) }}">
        <meta property="og:type" content="product">
        <meta property="og:url" content="{{ url()->current() }}">
        @if($image)
            <meta property="og:image" content="{{ $image }}">
        @endif

        {{-- Twitter Support --}}
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="{{ $product['name'] }} | Amaltas Furniture">
        <meta name="twitter:description" content="{{ Str::limit(strip_tags($description), 160) }}">
        @if($image)
            <meta name="twitter:image" content="{{ $image }}">
        @endif

    @else
        {{-- Default OG for non-product pages --}}
        <meta property="og:title" content="Amaltas Furniture">
        <meta property="og:description" content="Premium furniture and Modular Kitchens collection.">
        <meta property="og:type" content="website">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('default-share.jpg') }}">
    @endif

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