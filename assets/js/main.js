import "../../components/Dashboard";
import "../../components/Library";

new Vue({
	el: "#app",
	data: {
		currentComponent: "dashboard",
		menuItems: [
			{
				id: 1,
				icon: "bi bi-house",
				label: "Dashboard",
				href: "/",
                component: "dashboard",
			},
			{
				id: 2,
				icon: "bi bi-book",
				label: "Library",
				href: "/library",
                component: "library",
			},
			{
				id: 3,
				icon: "bi bi-info-circle",
				label: "About",
				href: "/about",
                component: "about",
			},
		],
	},

	methods: {
		navigate(component) {
			this.currentComponent = component;
		},
	},

	mounted() {
		this.navigate("dashboard");
	},
});
