import './header.css'
import HeaderImg from '../../assets/pasta-1181189.jpg'
export default function header() {
  return (
    <div className="header">
      <div className="headerTitles">
        <span className="headerTitleSm">The Chablis Media Digital Tech</span>
        <span className="headerTitleLg">Blog</span>
      </div>
      <img
        className="headerImg"
        src={HeaderImg}
        alt=""
      />
    </div>
  );
}
