import Box from './components/box';
import Layout from './components/layout';
import Paragraph from './components/paragraph';
import Block from './components/block';
import BoxForm from './components/BoxForm';
import LabelBox from './components/LabelBox';
import ComponentBox from './components/ComponentBox';
import TableBox from './components/TableBox';
import TableHeaderBox from './components/TableHeaderBox';
import TableCellBox from './components/TableCellBox';
import  LogicBox from './components/LogicBox';
import ArrayListBox from './components/ArrayListBox';
import TabsBox from './components/TabsBox';
import ContainerBox from './components/ContainerBox';
import ConfigBox from './components/ConfigBox';
import EditTextBox from './components/EditTextBox';

import InlineToolbar from './components/InlineToolbar';
import Event from './utils/Event';

const components = {
    Box,
    Layout,
    Paragraph,
    Block,
    BoxForm,
    LabelBox,
    ComponentBox,
    TableBox,
    TableHeaderBox,
    TableCellBox,
    LogicBox,
    ArrayListBox,
    TabsBox,
    ContainerBox,
    ConfigBox,
    EditTextBox,
    
    InlineToolbar
};

const box = components;

const install = function(Vue, opts = {}) {
    if (install.installed) return;

    Object.keys(box).forEach(key => {
        Vue.component(key, box[key]);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

const API = {
    version: process.env.VERSION, // eslint-disable-line no-undef
    install,
    Event,
    ...components
};


module.exports.default = module.exports = API;   // eslint-disable-line no-undef
