import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import gp_banner from "../assets/images/gp_banner.jpg";
import gp_population from "../assets/images/Population_Card.png";
import gp_connectivity from "../assets/images/Connectivity_Card.png";
import gp_literacy from "../assets/images/Literacy_card.png";
import gp_bachatgath from "../assets/images/Bachatgath_Card.png";
import AppCSS from "../App.css";
import axios from "axios";
import Moment from "react-moment";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsTitle: "",
      newsDesc: "",
      newsLastUpdate: "",
      newsAvailable: "none",
      bannerImgScr: "",
      bannerImgAlt: "Nothing",
      // instructionAvailable: "none",
      instructionMsg: "",
    };
  }
  // componentDidMount() {
  //   axios
  //     .get("http://localhost:4500/humbrat/home/news_panel")
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         this.setState({
  //           newsAvailable: "block",
  //           newsTitle: response.data[0].tbl_news_title,
  //           newsDesc: response.data[0].tbl_news_description,
  //           newsLastUpdate: response.data[0].tbl_news_updated_date,
  //         });
  //       } else {
  //         this.setState({
  //           newsAvailable: "none",
  //         });
  //       }
  //     })
  //     .catch(function (err) {
  //       console.log("Error: " + err);
  //     });
  // }
  async componentDidMount() {
    try {
      const newsPanel = await axios
        .get("http://humbrat.co.in/humbrat/home/news_panel")
        .then((response) => {
          if (response.data.length > 0) {
            this.setState({
              newsAvailable: "block",
              newsTitle: response.data[0].tbl_news_title,
              newsDesc: response.data[0].tbl_news_description,
              newsLastUpdate: response.data[0].tbl_news_updated_date,
            });
          } else {
            this.setState({
              newsAvailable: "none",
            });
          }
        });

      const bannerImage = await axios
        .get("http://humbrat.co.in/humbrat/dashboard_banner/getbanner")
        .then((response) => {
          if (response.data.length > 0) {
            this.setState({
              bannerImgScr: response.data[0].tbl_banner_title,
              bannerImgAlt: response.data[0].tbl_banner_img_desc,
            });
          }
        });

      const instructionMarquee = await axios
        .get("http://humbrat.co.in/humbrat/get_instructions")
        .then((response) => {
          if (response.data.length > 0) {
            this.setState({
              // instructionAvailable: "inherit",
              instructionMsg: response.data[0].tbl_instructions_msg,
            });
            console.log("instructionMsg success", this.state.instructionMsg);
          } else {
            console.log("instructionMsg failed", this.state.instructionMsg);
            this.setState({
              //   instructionAvailable: "none",
            });
          }
        });

      return newsPanel, bannerImage, instructionMarquee;
    } catch (error) {
      console.log("Error: ", error);
    }

    // .then((response) => {
    //   if (response.data.length > 0) {
    //     this.setState({
    //       newsAvailable: "block",
    //       newsTitle: response.data[0].tbl_news_title,
    //       newsDesc: response.data[0].tbl_news_description,
    //       newsLastUpdate: response.data[0].tbl_news_updated_date,
    //     });
    //   } else {
    //     this.setState({
    //       newsAvailable: "none",
    //     });
    //   }
    // })
    // .catch(function (err) {
    //   console.log("Error: " + err);
    // });
  }
  render() {
    const marginBottom = {
      marginBottom: "25px",
      border: "solid",
      borderColor: "#00cccc",
      //  boxShadow: "5px 5px #e6ffff",
    };
    var newsDate = this.state.newsLastUpdate;

    return (
      <div style={{ minHeight: "calc(100vh - 70px)" }}>
        {this.state.bannerImgScr == "" ? (
          <div></div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <img
              src={"uploads/" + this.state.bannerImgScr}
              alt={this.state.bannerImgAlt}
              className="img-fluid rounded rounded shadow p-3 mb-5 bg-white rounded"
            />
          </div>
        )}
        <marquee scrollamount="7">{this.state.instructionMsg}</marquee>
        <div
          className="card mb-3 shadow-sm p-3 mb-5 bg-white rounded"
          style={{ maxWidth: 100 + "%", display: this.state.newsAvailable }}
        >
          <div className="row no-gutters">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">{this.state.newsTitle}</h5>
                <p className="card-text" style={{ whiteSpace: "pre-line" }}>
                  {this.state.newsDesc}
                </p>
                <p className="card-text">
                  <small className="text-muted">
                    <Moment format="DD/MM/YYYY">{newsDate}</Moment>
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-deck">
          <div className="card" style={marginBottom}>
            <img src={gp_population} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">लोकसंख्या</h5>
              <p className="card-text">
                २०११ साली झालल्या जनगणनेनुसार हुंबरट गावची लोकसंख्या १६६९ इतकी
                होती. त्यापैकी ८६३ पुरुष व ८०६ महिला होत्या.
              </p>
              {/* <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p> */}
            </div>
          </div>
          <div className="card" style={marginBottom}>
            <img src={gp_bachatgath} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">बचतगट</h5>
              <p className="card-text">
                बचत गट हे महिलांना आर्थिकदृष्टया सबल बनवण्यासाठी उत्तम संधी
                असते. रोजगार आणि आत्मसन्मान या गोष्टी साध्या होतात त्याच बरोबर
                संघभावनाही यातून जोपासली जाते. एकूण २७ सक्रिय बचतगट गावात
                कार्यरत आहेत
              </p>
            </div>
          </div>

          <div className="card" style={marginBottom}>
            <img src={gp_connectivity} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">आरोग्य आणि स्वच्छता</h5>
              <p className="card-text">
                गावपातळीवर आरोग्य आणि स्वच्छतेसाठी बरेच कार्यक्रम आणि जनजागृती
                केली जाते. त्याचाच एक भाग म्हणून गाव मध्ये प्लास्टिक बंदीचे पालन
                केले जाते आणि त्यास गावातील व्यक्ती तसेच दुकानदार उत्तम प्रतिसाद
                देताना दिसत आहेत.
              </p>
            </div>
          </div>
        </div>
        <div className="card-deck">
          <div className="card" style={marginBottom}>
            <img src={gp_literacy} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">शाळा</h5>
              <p className="card-text">
                गावामध्ये एकूण ४ शाळा आहेत (जि. प. पूर्ण प्रा. १, जि. प. शाळा २,
                जि. प. प्रा. शाळा १) तसेच ५ अंगणवाड्या आहेत
              </p>
              {/* <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p> */}
            </div>
          </div>
          <div className="card" style={marginBottom}>
            <img src={gp_connectivity} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">सामाजिक कार्यक्रम</h5>
              <p className="card-text">
                ग्रामदैवत श्री पावणादेवी ची वार्षिक जत्रा,दसरा, हनुमान जयंती,
                हळदी-कुंकू, महिला दिन त्याच बरोबर थोर पुरुषांचे जयंती/ पुण्यतिथी
                यांसारखे कार्यक्रम मोठ्या उत्साहात साजरे केले जातात.
              </p>
            </div>
          </div>
          <div className="card" style={marginBottom}>
            <img src={gp_literacy} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">भौगोलिक स्थान</h5>
              <p className="card-text">
                हुंबरट गाव सिंधुदुर्ग जिल्ह्यातील कणकवली तालुक्यात आहे.
                शहरापासून सहा किलोमीटर अंतरावर असलेले हे गाव मुंबई-गोवा महामार्ग
                तसेच राज्यमार्गशी जोडलेला आहे.
              </p>
            </div>
            {/* <Map google={this.props.google} zoom={14}>
              <Marker onClick={this.onMarkerClick} name={"Current location"} />

              <InfoWindow onClose={this.onInfoWindowClose}>
              
              </InfoWindow>
            </Map> */}
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyCPNiAn8G9RoNU8zIjtJj4sFKGPoxXy8_Q",
// })(HomePage);
