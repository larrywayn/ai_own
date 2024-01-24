import { BrowserRouter, Route, Routes, useRouteError } from "react-router-dom";
import AudioCreator from "./Audio/AudioCreator";
import AudioTrainingCreator from "./AudioTraining/AudioTrainingCreator";
import ComplexError from "./StatusComps/ComplexError";
import NotFound from "./StatusComps/NotFound";
import UseCaseChooser from "./UseCaseChooser";
import VideoView from "./Video/VideoView";

function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  // @ts-ignore
  return <div>{error.message}</div>;
}

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          errorElement={<ErrorBoundary />}
          path="/"
          Component={UseCaseChooser}
        />
        <Route
          errorElement={<ErrorBoundary />}
          path="/video"
          Component={VideoView}
        />
        <Route
          errorElement={<ErrorBoundary />}
          path="/audio"
          Component={AudioCreator}
        />
        <Route
          errorElement={<ErrorBoundary />}
          path="/audiotraining"
          Component={AudioTrainingCreator}
        />
        <Route path="/error" Component={ComplexError} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
