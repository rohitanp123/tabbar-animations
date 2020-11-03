import React, { Component } from 'react';
import { View, StyleSheet, Dimensions, Text, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as shape from 'd3-shape';
import Svg, { Path } from 'react-native-svg';
import StaticTabbar, { tabHeight as height } from "./staticTabbar";

const width = Dimensions.get("window").width;

const tabs = [
    { name: "grid" },
    { name: "list" },
    { name: "refresh-cw" },
    { name: "box" },
    { name: "user" }
]
const tabWidth = width / tabs.length;
const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const left = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    ([
        { x: 0, y: 0 },
        { x: width, y: 0 },
    ])

const tab = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)
    ([
        { x: width, y: 0 },
        { x: width + 5, y: 0 },
        { x: width + 10, y: 10 },
        { x: width + 15, y: height - 10 },
        { x: width + tabWidth - 15, y: height - 10 },
        { x: width + tabWidth - 10, y: 10 },
        { x: width + tabWidth - 5, y: 0 },
        { x: width + tabWidth, y: 0 },
    ])

const right = shape.line()
    .x(d => d.x)
    .y(d => d.y)
    ([
        { x: width + tabWidth, y: 0 },
        { x: width * 2.5, y: 0 },
        { x: width * 2.5, y: height },
        { x: 0, y: height },
        { x: 0, y: 0 },

    ])

const d = `${left} ${tab} ${right}`;

export default class Tabbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: new Animated.Value(-width)
        }
    }
    render() {
        const { value: translateX } = this.state;
        return (
            <>

                <View {...{ width, height }} >
                    <AnimatedSvg width={width * 2.5} {...{ height }} style={{ transform: [{ translateX }] }}  >
                        <Path {...{ d }} fill="white" />
                    </AnimatedSvg>
                    <View style={StyleSheet.absoluteFill} >
                        <StaticTabbar value={translateX} {...{ tabs }} />
                    </View>
                </View>
                <SafeAreaView style={StyleSheet.safeArea} />
            </>
        )
    }
}

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: "white"
    }
})