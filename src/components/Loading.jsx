import Lottie from "react-lottie";
import loading from "../assets/loading"
const Loading = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };
    return (
        <div className="flex justify-center items-center">
            <Lottie options={defaultOptions} height= {400} width = {400}/>
        </div>
    )
}

export default Loading
