/**
 * Copyright (c) 2015 [3Doers]
 *
 * @author Luis Carlos Cruz Carballo [lcruzc@linkux-it.com]
 *
 */

import React from 'react';


export default class STLViewer extends React.Component {

  constructor (props, context, updater) {
    // Setup props as empty because now all are state.
    super(props, context, updater);
    this.colors = {
      black: '#000000',
      white: '#FFFFFF',
      red: '#FF0000',
      green: '#00FF00',
      blue: '#0000FF',
      yellow: '#FFFF00'
    };
  }

  _createJSC3DViewer () {
    let canvas = this.refs.figure.firstChild;

    // this will unbind event and avoid memory leack
    let _canvas = canvas.cloneNode(true);
    this.refs.figure.replaceChild(_canvas, canvas);

    let viewer = new JSC3D.Viewer(_canvas);
    viewer.setParameter('SceneUrl', `${ this.props.stlURL }`);
    viewer.setParameter('BackgroundColor1', '#E5D7BA');
    viewer.setParameter('BackgroundColor2', '#383840');
    viewer.setParameter('RenderMode', 'smooth');
    viewer.setParameter('Definition', 'high');
    viewer.setParameter('MipMapping', 'on');
    viewer.setParameter('CreaseAngle', '30');
    viewer.setParameter('ModelColor', `${ this.colors[this.props.projectColor] }`);
    viewer.init();
    viewer.update();
  }

  componentDidMount () {
    this._createJSC3DViewer();
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.projectColor !== this.props.projectColor ||
      nextProps.stlURL !== this.props.stlURL;
  }

  componentDidUpdate () {
    this._createJSC3DViewer();
  }

  render () {
    return (
      <figure ref='figure'>
        <canvas
          height={this.props.height || "315"}
          width={this.props.width || "390"}
          data-color={this.props.projectColor}
          >
        </canvas>
      </figure>
    );
  }
}
