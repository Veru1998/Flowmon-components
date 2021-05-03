import React from 'react';
import Component2  from '../components/Component2';

export default {
    title: "Components/C1",
    component: Component2
};

let incidents = [];
incidents.push(require("../incidents/incident7.json"));
let description = require("../properties/descr1.json");
let property = require("../properties/c2_property.json");

const Template = (args) => <Component2 {...args}/>;

export const Default = Template.bind({});
Default.args = {
    property:  {
        svg_height : 300,
        state_height : 40
        },
    incidents: incidents,
};

export const ColorDefined = Template.bind({});
ColorDefined.args = {
    property:  {
        svg_height : 300,
        state_height : 30,
        incidentColor:["#68A9C0"],
        },
    incidents: incidents,
};

export const ColorWithDomainStatus = Template.bind({});
ColorWithDomainStatus.args = {
    property:  {
        svg_height : 300,
        state_height : 30,
        incidentColor:["#68A9C0"],
        popup: ["status", "priority", "owner"],
        domain:"status",
        colors:[{
                domain: "new",
                color:"#ff4133"},
              {
                domain: "closed",
                color:"#ffa733"}],
        },
    incidents: incidents,
};

export const ColorWithDomainPriority = Template.bind({});
ColorWithDomainPriority.args = {
    property:  {
        svg_height : 300,
        state_height : 30,
        incidentColor:["#68A9C0"],
        popup: ["status", "priority", "owner"],
        domain:"priority",
        colors:[{
                domain: 4,
                color:"#ff4133"},
              {
                domain: 2,
                color:"#ffa733"}],
        },
    incidents: incidents,
};

export const PopupDefined = Template.bind({});
PopupDefined.args = {
    property:  {
        svg_height : 300,
        state_height : 30,
        popup: ["status", "priority", "owner"]
        },
    incidents: incidents,
};

export const IconDefined = Template.bind({});
IconDefined.args = {
    property:  {
        svg_height : 300,
        state_height : 25,
        popup: ["status", "priority", "owner"],
        icons: [
            {
              id: 4,
              iconType:"own",
              iconFormat:"base64",
              icon:"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiB3aWR0aD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOm5vbmU7c3Ryb2tlOiMwMDA7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS13aWR0aDoycHg7fTwvc3R5bGU+PC9kZWZzPjx0aXRsZS8+PGcgZGF0YS1uYW1lPSIxNS5QaW4iIGlkPSJfMTUuUGluIj48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSI3IiB4Mj0iMTMiIHkxPSI1IiB5Mj0iNSIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE4LDE0SDE3VjVhMiwyLDAsMCwwLDAtNEg3QTIsMiwwLDAsMCw3LDV2OUg2YTIsMiwwLDAsMCwwLDRIMThhMiwyLDAsMCwwLDAtNFoiLz48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSI3IiB4Mj0iMTciIHkxPSIxNCIgeTI9IjE0Ii8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMTIiIHgyPSIxMiIgeTE9IjE4IiB5Mj0iMjMiLz48L2c+PC9zdmc+"
            }
          ]
        },
    incidents: incidents,
};

export const OwnProperties = Template.bind({});
OwnProperties.args = {
    property: property,
    incidents: incidents
};