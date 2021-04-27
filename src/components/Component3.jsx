import React, { Component } from 'react';
import $ from 'jquery';
import * as d3 from "d3";
import "../index.css";

class Component3 extends Component {
    constructor(props) {
        super(props);
        this.ref3 = React.createRef();
    }

    createRect() {
        let incident = this.props.incident;
        // index of state clicked on c1
        let clickedState = null;
        if (typeof this.props.clickedState != "undefined") {
            clickedState = this.props.clickedState;
        }

        let description = {};
        if (typeof this.props.description != "undefined") {
            description = this.props.description;
        }

        let property = {};
        if (typeof this.props.property != "undefined") {
            property = this.props.property;
        }
        
        // Format of days to show in rect.
        let format = d3.timeFormat("%d %b %Y %H:%M:%S");
        
        // Set default height of component or height from file description.
        let height = 500;
        let statesOnPage = 10;
        let color = "rgb(204, 204, 204)";
        if (typeof description.height != "undefined") {
            height = parseInt(description.height);
        }

        // Set states per page.
        if (typeof description.statesOnPage != "undefined") {
            statesOnPage = parseInt(description.statesOnPage);
        }

        // Set color of rectangle.
        if (typeof description.color != "undefined") {
            color = description.color;
        }

        // Find out if incidents are colored in c1/2.
        let colorBase = "";
        if (typeof property.domain != "undefined"){
            colorBase = property.domain;
        }

        // Set overflow of the div where c3 is placed -> requirement to be scrollable. 
        $(".component3").css("overflow-y", "scroll").css("height", height);

        let more = d3.select(".component3");
        let prev = d3.select(".component3");

        let i = incident.times.length - 1;
        let state, text, image, list, incidentColor = null;
        let allStates = incident.times.length - 1;
        let lastRenderedState = allStates;
        let firstRenderedState = allStates;

        /**
         * Function for filling the rectangle with info about state e.
         * @param {state} e State which will be described in rectangle.
         */
        function fillRect(e) {
            // Create div for state. 
            state = document.createElement("div");
            state.id = "state" + i;
            state.style.backgroundColor = color;
            document.getElementsByClassName("component3")[0].append(state);

            // Filling rectangle with info about state.
            let keys = Object.keys(e);
            if (keys.includes("color")) {
                incidentColor = e["color"];
            }
            else {
                incidentColor = null;
            }

            keys.forEach(obj => {
                text = document.createElement("p");
                list = document.createElement("ul");
                image = document.createElement("img");
                image.style.maxHeight = "500px";
                image.style.maxWidth = document.getElementById(state.id).clientWidth - 150 + "px";
                let liTag = document.createElement("li");
                let dot = document.createElement("span");
                dot.className = "dot";

                let name = obj;
                switch (obj) {
                    case "starting_time":
                        name = "start";
                        text.innerHTML = "<b>" + name + ": </b>" + format(new Date(e[obj]));
                        break;
                    case "ending_time":
                        name = "end";
                        text.innerHTML = "<b>" + name + ": </b>" + format(new Date(e[obj]));
                        break;
                    // don't show the color and x 
                    case "color":
                        break;
                    case "x":
                        break;
                    case "name":
                        break;
                    default:
                        // if there is list of items
                        if (Array.isArray(e[obj])) {
                            text.innerHTML = "<b>" + name + ": </b>";
                            e[obj].forEach(o => {
                                list.innerHTML += "<li>" + o +"</li>";
                            });
                            text.append(list);
                            break;
                        }
                        let timePattern = /Time/;
                        if (timePattern.test(name)) {
                            text.innerHTML = "<b>" + name + ": </b>" + format(new Date(e[obj]));
                            break;
                        } 
                        let imagePattern = /Image/;
                        if ((imagePattern.test(name)) || (name === "graph")) {
                            text.innerHTML = "<b>" + name + ": </b>";
                            image.src = e[obj];
                            image.alt = "";
                            text.append(image);
                            break;
                        }
                        text.innerHTML = "<b>" + name + ": </b>" + e[obj]; 
                        break;
                }
                if ((obj === colorBase) && (incidentColor != null)) {
                    dot.style.backgroundColor = incidentColor;
                    text.append(dot);
                }
                document.getElementById(state.id).append(text);
            });
            i--;
        }

        /**
         * Function for rendering on click more or previous.
         */
         function showMoreButtons() {
            d3.select(".component3").selectAll("*").remove();
            prev.append("button")
            .text("Show previous")
            .attr("id", "prevBtn")
            .style("visibility", "hidden")
            .on("click", function () {
                 if (firstRenderedState + statesOnPage > allStates) {
                    lastRenderedState = allStates;
                }
                else {
                    lastRenderedState = firstRenderedState + statesOnPage;
                } 
                showMoreButtons(); 
            });

            if (lastRenderedState <= statesOnPage) {
                firstRenderedState = lastRenderedState;
                i = lastRenderedState;
                while (lastRenderedState >= 0) {
                    fillRect(incident.times[lastRenderedState]);
                    lastRenderedState--;
                } 
                lastRenderedState = 0;
            } 
            else {
                firstRenderedState = lastRenderedState;
                i = lastRenderedState;
                for (let j = 0; j < statesOnPage; j++) {
                    fillRect(incident.times[lastRenderedState - j]);
                }
                lastRenderedState -= statesOnPage;
            }

            more.append("button")
            .text("Show more")
            .attr("id", "moreBtn")
            .style("visibility", "hidden")
            .on("click", function () {
                showMoreButtons(); 
            });

            if (firstRenderedState < allStates) {
                d3.select("#prevBtn").style("visibility", "visible");
            }
            else {
                d3.select("#prevBtn").style("visibility", "hidden");
            }
            if (lastRenderedState > 0) {
                d3.select("#moreBtn").style("visibility", "visible");
            }
            else {
                d3.select("#moreBtn").style("visibility", "hidden");
            }
        }

        if (clickedState != null) {
            let interval = allStates;
            for (let i = parseInt(allStates/statesOnPage); i > 0; i--) {
                if (clickedState <= allStates - i * statesOnPage) {
                    lastRenderedState = allStates - i * statesOnPage;
                    break;
                }
                if (interval >= clickedState >= interval - statesOnPage) {
                    lastRenderedState = interval;
                    break;
                }
                interval -= statesOnPage;
            }
        }
        showMoreButtons();
        if (document.getElementById("state"+clickedState) != null) {
            document.getElementById("state"+clickedState).scrollIntoView({ behavior: "smooth" });
        }
    }

    componentDidMount() {
        this.createRect();
    }
    
    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) 
            this.createRect();
    }

    render() {
        return (
            <div className="component3" ref={this.ref3}></div>
        );
    }
}

export default Component3;