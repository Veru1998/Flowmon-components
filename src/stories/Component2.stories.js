import React from 'react';
import Component2 from '../components/Component2';

export default {
    title: "Components/C2",
    component: Component2
};

let incidents = [];
incidents.push(require("../incidents/incident5.json"));
incidents.push(require("../incidents/incident2.json"));
incidents.push(require("../incidents/incident4.json"));
incidents.push(require("../incidents/incident3.json"));
let description = require("../properties/descr1.json");
let property = require("../properties/c2_property.json");

const Template = (args) => <Component2 {...args}/>;

export const Default = Template.bind({});
Default.args = {
    property:  {
        svg_height : 300,
        state_height : 20
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
        state_height : 25,
        popup: ["status", "priority", "owner"],
        },
    incidents: incidents,
};

export const IconsDefined = Template.bind({});
IconsDefined.args = {
    property:  property,
    incidents: incidents,
};

export const OwnProperties = Template.bind({});
OwnProperties.args = {
    property: property,
    incidents: incidents,
    description: description
};