import { Player} from "@lottiefiles/react-lottie-player";
import './scss/loading.scss';

export default function LottyLoading(props) {
  return (
    <div className="position-relative d-flex justify-content-center w-100">
      <Player
        autoplay
        loop
        src="https://assets10.lottiefiles.com/packages/lf20_x62chJ.json"
        style={{ height: "300px", width: "300px" }}
      />
      <div className="loading-text">{props.text}</div>
    </div>
  );
}
