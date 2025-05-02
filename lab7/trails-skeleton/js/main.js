
// Global objects go here (outside of any functions)
let data, scatterplot, barchart; 
let difficultyFilter = [];

// initialize dispatcher
const dispatcher = d3.dispatch('filterCategories');


/**
 * Load data from CSV file asynchronously and render charts
 */


d3.csv('data/vancouver_trails.csv')
   .then(_data => {
     data = _data; // for safety, so that we use a local copy of data.

     // ... data preprocessing etc. ... TODO: you add code here for numeric
     // Be sure to examine your data to fully understand the code
     data.forEach(d => {
        d.time = +d.time;
        d.distance = +d.distance;  
      });
      

     // Initialize scale
     // TODO: add an ordinal scale for the difficulty
     // See Lab 4 for help
     const colorScale = d3.scaleOrdinal()
        .domain(['Easy', 'Intermediate', 'Difficult'])
        .range(d3.schemeGreens[3]); // light to dark green using scheme


    scatterplot = new Scatterplot({
        parentElement: '#scatterplot', // updated config
        colorScale: colorScale
      }, data); 
     scatterplot.updateVis();

     barchart = new Barchart({
        parentElement: '#barchart', // updated config
        colorScale: colorScale
      }, dispatcher, data); // pass the dispatcher
     barchart.updateVis();
   })
  .catch(error => console.error(error));

/**
 * Use bar chart as filter and update scatter plot accordingly
 */
dispatcher.on('filterCategories', selectedCategories => {
	if (selectedCategories.length == 0) {
		scatterplot.data = data;
	} else {
		scatterplot.data = data.filter(d => selectedCategories.includes(d.difficulty));
	}
	scatterplot.updateVis();
});





