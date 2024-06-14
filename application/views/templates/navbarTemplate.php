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
                        <a class="nav-link text-light" :href="item.href">
                            <i :class="item.icon" style="margin-right: 0.5rem;"></i>{{ item.label }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>