const path = require('path');
const arvish = require('arvish');
const globby = require('globby');

async function getRecipes() {
  return (await globby('./recipes/*.png'))
    .map(recipe => ({
      type: 'file',
      title: path.basename(recipe, '.png'),
      arg: recipe,
      quicklookurl: path.resolve(recipe),
      icon: {
        path: './icons/' + path.basename(recipe),
      },
    }))
    .sort((a, b) => a.title.localeCompare(b.title));
}

(async () => {
  const recipes = await getRecipes();
  arvish.output(arvish.inputMatches(recipes, 'title'));
})();
