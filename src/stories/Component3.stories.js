import React from 'react';
import Component3 from '../components/Component3';

export default {
    title: "Components/C3",
    component: Component3
};

let incident = require("../incidents/i3_3.json");
let description = require("../popup_properties/descr1.json");
let property = require("../properties/c2_property.json");

const Template = (args) => <Component3 {...args}/>;

export const Default = Template.bind({});
Default.args = {
    incident: incident,
    //description: description,
    //property: {}
};

let description1 = require("../popup_properties/descr.json");
export const ColorDefined = Template.bind({});
ColorDefined.args = {
    incident: incident,
    description: description1,
    //property: {}
};

incident = require("../incidents/i2_3.json");
export const FewIncidents = Template.bind({});
FewIncidents.args = {
    incident: incident,
    description: description,
    //property: {}
};

incident = require("../incidents/i6_3.json");
export const ManyIncidents = Template.bind({});
ManyIncidents.args = {
    incident: incident,
    description: description,
    //property: {}
};

export const OwnProperties = Template.bind({});
OwnProperties.args = {
    incident: incident,
    description: description1,
    property: property
};