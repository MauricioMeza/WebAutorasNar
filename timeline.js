// Sample data
const data = [
    { "year": 2000, "artist": "Artist A", "work": "Work 1" },
    { "year": 2000, "artist": "Artist B", "work": "Work 2" },
    { "year": 2000, "artist": "Artist A", "work": "Work 3" },
    { "year": 2001, "artist": "Artist C", "work": "Work 4" },
    { "year": 2002, "artist": "Artist A", "work": "Work 5" },
    { "year": 2002, "artist": "Artist B", "work": "Work 6" },
    { "year": 2003, "artist": "Artist A", "work": "Work 7" },
    { "year": 2003, "artist": "Artist C", "work": "Work 8" },
    { "year": 2003, "artist": "Artist B", "work": "Work 9" },
    { "year": 2004, "artist": "Artist A", "work": "Work 10" },
    { "year": 2005, "artist": "Artist B", "work": "Work 11" },
    { "year": 2005, "artist": "Artist A", "work": "Work 12" },
    { "year": 2006, "artist": "Artist A", "work": "Work 13" },
    { "year": 2007, "artist": "Artist A", "work": "Work 1" },
    { "year": 2007, "artist": "Artist B", "work": "Work 2" },
    { "year": 2008, "artist": "Artist A", "work": "Work 3" },
    { "year": 2010, "artist": "Artist C", "work": "Work 4" },
    { "year": 2010, "artist": "Artist A", "work": "Work 5" },
    { "year": 2011, "artist": "Artist B", "work": "Work 6" },
    { "year": 2012, "artist": "Artist A", "work": "Work 7" },
    { "year": 2013, "artist": "Artist C", "work": "Work 8" },
    { "year": 2013, "artist": "Artist B", "work": "Work 9" },
    { "year": 2014, "artist": "Artist A", "work": "Work 10" },
    { "year": 2015, "artist": "Artist B", "work": "Work 11" },
    { "year": 2015, "artist": "Artist A", "work": "Work 12" },
    { "year": 2016, "artist": "Artist A", "work": "Work 13" },
];

const margin = {top: 20, right: 20, bottom: 20, left: 50};
const squareSize = 40;

// Get the width and height of the SVG dynamically
const svg = d3.select("svg");
const width = parseInt(svg.style("width")) - margin.left - margin.right;
const height = parseInt(svg.style("height")) - margin.top - margin.bottom;

const years = [...new Set(data.map(d => d.year))];
const artists = [...new Set(data.map(d => d.artist))];

// Assign each artist a unique color
const colorScale = d3.scaleOrdinal()
    .domain(artists)
    .range(d3.schemeSet2);

// Create a horizontal scale for years
const xScale = d3.scaleBand()
    .domain(years)
    .range([0, width])
    .padding(0.1);

// Tooltip div
const tooltip = d3.select(".tooltip");

// Append main group and shift for margins
const g = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Draw year groups horizontally
g.selectAll(".year-group")
    .data(years)
    .enter()
    .append("g")
    .attr("class", "year-group")
    .attr("transform", d => `translate(${xScale(d)}, 0)`)
    .each(function(year) {
        const yearGroup = d3.select(this);

        const works = data.filter(d => d.year === year);

        // Calculate the starting position from the bottom (above the line)
        const startY = height - 20 - squareSize;

        // Draw squares for each work, piling them from the bottom up
        yearGroup.selectAll(".work-square")
            .data(works)
            .enter()
            .append("rect")
            .attr("class", "work-square")
            .attr("x", 0)
            .attr("y", (d, i) => startY - i * (squareSize + 5))
            .attr("width", squareSize)
            .attr("height", squareSize)
            .attr("fill", d => colorScale(d.artist))  // Color by artist
            .on("mouseover", function(event, d) {
                tooltip
                    .style("visibility", "visible")
                    .text(`Artist: ${d.artist}, Work: ${d.work}, Year: ${d.year}`);
            })
            .on("mousemove", function(event) {
                tooltip
                    .style("top", (event.pageY + 10) + "px")
                    .style("left", (event.pageX + 10) + "px");
            })
            .on("mouseout", function() {
                tooltip.style("visibility", "hidden");
            });
    });

// Add the line above the year labels
g.append("line")
    .attr("class", "line")
    .attr("x1", 0)
    .attr("x2", width)
    .attr("y1", height - 20)
    .attr("y2", height - 20);

// Draw year labels at the bottom
g.selectAll(".year-label")
    .data(years)
    .enter()
    .append("text")
    .attr("class", "year-label")
    .attr("x", d => xScale(d) + squareSize / 2)
    .attr("y", height - 5)
    .text(d => d);