import React from "react";

export default class EmailTemplate extends React.Component {
  onClick = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <img
              src="/assets/img/demo/basic.png"
              alt="Basic Email Template"
              style={{ width: "100%", height: "auto" }}
            />
            <br />
            <br />
            <a
              onClick={this.onClick}
              href="../COMMON_/assets/GOODIES/email-templates/basic.html"
              target="_blank"
              className="btn btn-primary btn-block"
            >
              Basic Email Template
            </a>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <img
              src="/assets/img/demo/sidebar.png"
              alt="Sidebar Email Template"
              style={{ width: "100%", height: "auto" }}
            />
            <br />
            <br />
            <a
              onClick={this.onClick}
              href="../COMMON_/assets/GOODIES/email-templates/sidebar.html"
              target="_blank"
              className="btn btn-primary btn-block"
            >
              Sidebar Email Template
            </a>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <img
              src="/assets/img/demo/hero.png"
              alt="Hero Email Template"
              style={{ width: "100%", height: "auto" }}
            />
            <br />
            <br />
            <a
              onClick={this.onClick}
              href="../COMMON_/assets/GOODIES/email-templates/hero.html"
              target="_blank"
              className="btn btn-primary btn-block"
            >
              Hero Email Template
            </a>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <img
              src="/assets/img/demo/sidebarhero.png"
              alt="Sidebar with Hero"
              style={{ width: "100%", height: "auto" }}
            />
            <br />
            <br />
            <a
              onClick={this.onClick}
              href="../COMMON_/assets/GOODIES/email-templates/sidebar-hero.html"
              target="_blank"
              className="btn btn-primary btn-block"
            >
              Sidebar with Hero
            </a>
          </div>
          <div className="col-xs-12 col-sm-4 col-md-3 col-lg-2">
            <img
              src="/assets/img/demo/newsletter.png"
              alt="Newsletter Email Template"
              style={{ width: "100%", height: "auto" }}
            />
            <br />
            <br />
            <a
              onClick={this.onClick}
              href="../COMMON_/assets/GOODIES/email-templates/newsletter.html"
              target="_blank"
              className="btn btn-primary btn-block"
            >
              Newsletter Template
            </a>
          </div>
        </div>
      </div>
    );
  }
}
