<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css2?family=Uncial+Antiqua&display=swap" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="stylesheet" type="text/css" href="<?php echo base_url("assets/css/app.css"); ?>">
    <title>Grimoire</title>
</head>

<body>
    <div id="app" class="app">
        <div class="header">
            <div class="navbar navbar-expand-lg bg-dark">
                <div class="container-fluid p-2 d-flex align-items-center">
                    <a class="navbar-brand text-light" style="font-family: 'Uncial Antiqua', cursive;">
                        <i class="bi bi-bookmark-fill"></i>
                        Grimoire
                    </a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="bi bi-list text-light"></i>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul class="navbar-nav">
                            <li v-for="item in menuItems" class="nav-item">
                                <a class="nav-link text-light" :href="item.href" @click.prevent="navigate(item.component, item.props)"><i :class="item.icon" style="margin-right: 0.5rem;"></i>{{ item.label }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="container main p-3">
            <component :is="currentComponent" v-bind="currentProps" class="container p-3 m-3"></component>
        </div>
    </div>
    <script type="text/javascript" src="<?php echo base_url("assets/js/app.js"); ?>"></script>
</body>
</html>
