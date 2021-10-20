import Lottie from "react-lottie";
import nodata from "../assets/nodata"

const NoResults = ({title}) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: nodata,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
    };
    return (
        <div className="flex justify-center items-center flex-col w-full overflow-hidden">
            <Lottie options={defaultOptions} height= {350} width = {350}/>
            <p className="font-bold text-lg mt-5">{title}</p>
        </div>
    )
}

export default NoResults
