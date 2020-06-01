function init() {
  var selector = d3.select("#selDataset");

  d3.json("samples.json").then((data) => {
    console.log(data);
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });
})}

init();

function optionChanged(newSample) {
  buildMetadata(newSample);
  buildCharts(newSample);
}

function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    var PANEL = d3.select("#sample-metadata");

    PANEL.html("");
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("ethnicity: " + result.ethnicity);
    PANEL.append("h6").text("gender: " + result.gender);
    PANEL.append("h6").text("age: " + result.age);
    PANEL.append("h6").text("location: " + result.location);
    PANEL.append("h6").text("bbtype: " + result.bbtype);
    PANEL.append("h6").text("wfreq: " + result.wfreq);
    PANEL.append("h6").text()
  });
}

function buildCharts(sample) {
  d3.json("samples.json").then((data) => {
  console.log("hello");
  var sample_array = data.samples.filter(sampleObj => sampleObj.id ==sample).reverse();
  var subject = sample_array[0];
  var sample_values = subject.sample_values;
  console.log(subject);
  var otu_ids = subject.otu_ids;
  var otu_labels = subject.otu_labels;

  // Slice the first 10 objects for plotting
sample_values = sample_values.slice(0, 10);
// Trace1 
var trace1 = {
  x: sample_values,
  text: otu_labels,
  name: "OTUs",
  type: "bar",
  orientation: "h"
};
var graph = [trace1]
// Apply the group bar mode to the layout
var layout = {
  title: "top 10 OTUs",
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100,
  }
};

Plotly.newPlot("bar", graph, layout)

var trace2 = {
  x: otu_ids,
  y: sample_values,
  mode: 'markers',
  marker: {
    color: otu_ids,
    size: sample_values
  },
  text: otu_labels
};

var data2 = [trace2];

var layout = {
  title: "OTU ID",
  showlegend: false,
  height: 500,
  width: 800
};

Plotly.newPlot('bubble', data2, layout);

var wfreq = subject.wfreq;
var data3 = [
  {
    type: "indicator",
    mode: "gauge+number",
    value: wfreq,
    title: { text: "Belly Button Washing Frequency", font: { size: 18 }},
      gauge: {
        axis: { range: [0, 9] },
      steps: [
        { range: [0, 1], color: "floralwhite" },
        { range: [1, 2], color: "cornsilk" },
        { range: [2, 3], color: "blanchedalmond" },
        { range: [3, 4], color: "beige" },
        { range: [4, 5], color: "lightgray" },
        { range: [5, 6], color: "honeydew" },
        { range: [6, 7], color: "mediumaquamarine" },
        { range: [7, 8], color: "mediumseagreen" },
        { range: [8, 9], color: "seagreen" },
      ],
     threshold: {
        line: { color: "red", width: 2 },
        thickness: 0.75,
        value: wfreq
     }
      }
  }
];

var layout2 = {
  width:500,
  height:400,
  margin: { t: 25, r: 25, l: 25, b: 25 }
};

Plotly.newPlot('gauge', data3, layout2);
  })}