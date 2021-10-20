import Lottie from "react-lottie";
import error from "../assets/error"

const Error = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="flex justify-center items-center flex-col">
            <Lottie options={defaultOptions} height= {250} width = {300}/>
        </div>
    )
}

export default Error
