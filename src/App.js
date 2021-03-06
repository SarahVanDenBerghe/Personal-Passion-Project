import React, { useState } from 'react';
import { Navbar } from './components/UI';
import { Tree, Home, Create } from './components/Pages';
import { CanvasWrapperCreator, CanvasWrapperHome } from './components/Scene';
import AnimatedCursor from 'react-animated-cursor';
import { Route, Redirect } from 'react-router-dom';
import { Switch, useLocation } from 'react-router';
import { ROUTES } from './consts';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Particles from 'react-particles-js';
import particlesConfig from './assets/configs/particles-config';
import { useStore } from './hooks';

import './App.scss';

const App = () => {
  const { treeStore } = useStore();
  const [showTree, setShowTree] = useState(false);
  const [showDecoration, setShowDecoration] = useState(true);
  const [showIntroCanvas, setShowIntroCanvas] = useState(true);

  let location = useLocation();
  const isTree = 'tree' === location.pathname.split('/')[1];

  if (isTree) {
    const treeId = location.pathname.split('/')[2];
    if (treeId) {
      treeStore.findTreeById(treeId);
    }
  }

  return (
    <>
      <div className="app">
        {/* Style elements */}
        <div className="noise" />
        <Particles className="particles" params={particlesConfig} />
        <AnimatedCursor outerAlpha={0.3} color="255, 255, 255" />

        {/* Fixed elements & Canvas */}
        <Navbar />
        {isTree && showTree && treeStore.currentTree && <CanvasWrapperCreator />}
        {!isTree && <CanvasWrapperHome showDecoration={showDecoration} showIntroCanvas={showIntroCanvas} />}

        {/* Pages */}
        <TransitionGroup className="content">
          <CSSTransition key={location.pathname} timeout={500}>
            <Switch location={location}>
              <Route path={ROUTES.tree.path}>
                <Tree setShowTree={setShowTree} showTree={showTree} />
              </Route>
              <Route exact path={ROUTES.create}>
                <Create setShowIntroCanvas={setShowIntroCanvas} setShowDecoration={setShowDecoration} />
              </Route>
              <Route exact path={ROUTES.home}>
                <Home setShowDecoration={setShowDecoration} />
              </Route>
              {/* <Route>
                <Redirect to={ROUTES.home} />
              </Route> */}
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
};

export default App;
