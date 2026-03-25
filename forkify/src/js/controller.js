
//import "regenerator-runtime/runtime";
import * as model from "./model.js"
import recipeView from "./views/recipeView.js";
import resultView from "./views/resultView.js";
import bookMarkView from "./views/bookMarkView.js";
import paginationView from "./views/paginationView.js";
import addRecipeView from "./views/addRecipeView.js";
import { MODAL_CLOSE_SEC } from "./config.js";

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);
		if (!id) return;

		recipeView.renderSpinner();

		await model.loadRecipe(id);

		recipeView.render(model.state.recipe);


	} catch (err) {
		console.error(err);
	}

};

const controlSearch = async function () {
	try {
		const query = document.querySelector(".search__field").value;
		if (!query) return;

		await model.loadSearchResults(query);
		resultView.render(model.getSearchResultPage());

		paginationView.render(model.state.search);

	} catch (err) {
		console.error(err);
	}
};

const controlPagination = function (goToPage) {
	resultView.render(model.getSearchResultPage(goToPage));
	paginationView.render(model.state.search);
}

const controlBookmark = function () {
	if (!model.state.recipe.bookmarked) {
		model.addBookmark(model.state.recipe);
	} else {
		model.deleteBookmark(model.state.recipe.id);
	}
	localStorage.setItem("bookmarks", JSON.stringify(model.state.bookmarks));
	recipeView.render(model.state.recipe);

	if (model.state.bookmarks.length === 0) {
		bookMarkView.noBookmarks();
	} else {
		//bookMarkView.render(model.state.bookmarks);
		bookMarkView.render(JSON.parse(localStorage.getItem("bookmarks")));
	}
};

const controlServings = function (newServings) {
	model.updateServings(newServings);

	recipeView.render(model.state.recipe);
}

const controlAddRecipe = async function (newRecipe) {
	try {

		addRecipeView.renderSpinner();
		await model.uploadRecipe(newRecipe);
		console.log(model.state.recipe);

		recipeView.render(model.state.recipe);

		addRecipeView.renderMessage("La receta ha sido correctamente añadida");

		bookMarkView.render(model.state.bookmarks);

		window.history.pushState(null, "", `#${model.state.recipe.id}`);

		setTimeout(function () {
			addRecipeView.toggleWindow()
		}, MODAL_CLOSE_SEC * 1000);

	} catch (err) {
		console.log(err);
		addRecipeView.renderError(err.message);
	}


}
const init = function () {
	bookMarkView.addHandlerBookmark(controlBookmark);
	paginationView.addhandlerClick(controlPagination);
	recipeView.addhandlerUpdateServings(controlServings);
	addRecipeView.addHandlerUpload(controlAddRecipe);

	const storage = JSON.parse(localStorage.getItem("bookmarks")) || [];
	model.state.bookmarks = storage;

	if (storage.length === 0) {
		bookMarkView.noBookmarks();
	} else {
		bookMarkView.render(storage);
	}
};

init();



document.querySelector(".search").addEventListener("submit", function (e) {
	e.preventDefault();
	controlSearch();
});

['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipes));