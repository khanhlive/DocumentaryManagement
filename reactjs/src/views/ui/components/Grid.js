import React from "react";

export default class BlankPage extends React.Component {
  onClick = e => {
    e.preventDefault();
  };
  render() {
    return (
      <div id="content">
        <div className="well">
          <h1>Grid options</h1>
          <p>
            See how aspects of the Bootstrap grid system work across multiple
            devices with a handy table.
            <br />
            <br />
          </p>
          <div className="row">
            <div className="col-sm-3">
              <img
                src="/assets/img/demo/responseimg.png"
                alt=""
                style={{ maxWidth: 300, width: "100%" }}
              />
              <br />
              <h3>BuiltWith Bootstrap</h3>
              Bootstrap is made to not only look and behave great in the latest
              desktop browsers, but in tablet and smartphone browsers too. It’s
              packed with great features. Such as the 12-column responsive
              mobile first grid, dozens of components, plugins and more!
            </div>
            <div className="col-sm-9">
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th />
                    <th>
                      Extra small devices <small>Phones (&lt;768px)</small>
                    </th>
                    <th>
                      Small devices <small>Tablets (≥768px)</small>
                    </th>
                    <th>
                      Medium devices <small>Desktops (≥992px)</small>
                    </th>
                    <th>
                      Large devices <small>Desktops (≥1200px)</small>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Grid behavior</th>
                    <td>Horizontal at all times</td>
                    <td colSpan={3}>
                      Collapsed to start, horizontal above breakpoints
                    </td>
                  </tr>
                  <tr>
                    <th>Max container width</th>
                    <td>None (auto)</td>
                    <td>750px</td>
                    <td>970px</td>
                    <td>1170px</td>
                  </tr>
                  <tr>
                    <th>Class prefix</th>
                    <td>
                      <code>.col-xs-</code>
                    </td>
                    <td>
                      <code>.col-sm-</code>
                    </td>
                    <td>
                      <code>.col-md-</code>
                    </td>
                    <td>
                      <code>.col-lg-</code>
                    </td>
                  </tr>
                  <tr>
                    <th># of columns</th>
                    <td colSpan={4}>12</td>
                  </tr>
                  <tr>
                    <th>Max column width</th>
                    <td className="text-muted">Auto</td>
                    <td>60px</td>
                    <td>78px</td>
                    <td>95px</td>
                  </tr>
                  <tr>
                    <th>Gutter width</th>
                    <td colSpan={4}>30px (15px on each side of a column)</td>
                  </tr>
                  <tr>
                    <th>Nestable</th>
                    <td colSpan={4}>Yes</td>
                  </tr>
                  <tr>
                    <th>Offsets</th>
                    <td colSpan={1} className="text-muted">
                      N/A
                    </td>
                    <td colSpan={3}>Yes</td>
                  </tr>
                  <tr>
                    <th>Column ordering</th>
                    <td className="text-muted">N/A</td>
                    <td colSpan={3}>Yes</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <h6>Example: Stacked-to-horizontal</h6>
        <p>
          Using a single set of <code>.col-md-*</code>
          grid classes, you can create a basic grid system that starts out
          stacked on mobile devices and tablet devices (the extra small to small
          range) before becoming horizontal on desktop (medium) devices.
        </p>
        <div className="well">
          <div className="row show-grid">
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
            <div className="col-md-1">.col-md-1</div>
          </div>
          <div className="row show-grid">
            <div className="col-md-8">.col-md-8</div>
            <div className="col-md-4">.col-md-4</div>
          </div>
          <div className="row show-grid">
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4">.col-md-4</div>
          </div>
          <div className="row show-grid">
            <div className="col-md-6">.col-md-6</div>
            <div className="col-md-6">.col-md-6</div>
          </div>
        </div>
        <h6>Example: Mobile and desktop</h6>
        <p>
          Don't want your columns to simply stack in smaller devices? Use the
          extra small and medium device grid classes by adding
          <code>.col-xs-*</code> <code>.col-md-*</code> to your columns. See the
          example below for a better idea of how it all works.
        </p>
        <div className="well">
          <div className="row show-grid">
            <div className="col-xs-12 col-md-8">.col-xs-12 col-md-8</div>
            <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
          </div>
          <div className="row show-grid">
            <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
            <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
            <div className="col-xs-6 col-md-4">.col-xs-6 .col-md-4</div>
          </div>
          <div className="row show-grid">
            <div className="col-xs-6">.col-xs-6</div>
            <div className="col-xs-6">.col-xs-6</div>
          </div>
        </div>
        <h6>Example: Mobile, tablet, desktops</h6>
        <p>
          Build on the previous example by creating even more dynamic and
          powerful layouts with tablet <code>.col-sm-*</code> classes.
        </p>
        <div className="well">
          <div className="row show-grid">
            <div className="col-xs-12 col-sm-6 col-md-8">
              .col-xs-12 .col-sm-6 .col-md-8
            </div>
            <div className="col-xs-6 col-sm-6 col-md-4">
              .col-xs-6 .col-sm-6 .col-md-4
            </div>
          </div>
          <div className="row show-grid">
            <div className="col-xs-6 col-sm-4 col-md-4">
              .col-xs-6 .col-sm-4 .col-md-4
            </div>
            <div className="col-xs-6 col-sm-4 col-md-4">
              .col-xs-6 .col-sm-4 .col-md-4
            </div>
            {/* Optional: clear the XS cols if their content doesn't match in height */}
            <div className="clearfix visible-xs" />
            <div className="col-xs-6 col-sm-4 col-md-4">
              .col-xs-6 .col-sm-4 .col-md-4
            </div>
          </div>
        </div>
        <h6>Offsetting columns</h6>
        <p>
          Move columns to the right using <code>.col-md-offset-*</code> classes.
          These classes increase the left margin of a column by <code>*</code>
          columns. For example, <code>.col-md-offset-4</code> moves
          <code>.col-md-4</code> over four columns.
        </p>
        <div className="well">
          <div className="row show-grid">
            <div className="col-md-4">.col-md-4</div>
            <div className="col-md-4 col-md-offset-4">
              .col-md-4 .col-md-offset-4
            </div>
          </div>
          <div className="row show-grid">
            <div className="col-md-3 col-md-offset-3">
              .col-md-3 .col-md-offset-3
            </div>
            <div className="col-md-3 col-md-offset-3">
              .col-md-3 .col-md-offset-3
            </div>
          </div>
          <div className="row show-grid">
            <div className="col-md-6 col-md-offset-3">
              .col-md-6 .col-md-offset-3
            </div>
          </div>
        </div>
        <h6>Nesting columns</h6>
        <p>
          To nest your content with the default grid, add a new
          <code>.row</code> and set of <code>.col-md-*</code> columns within an
          existing <code>.col-md-*</code> column. Nested rows should include a
          set of columns that add up to 12.
        </p>
        <div className="well">
          <div className="row show-grid">
            <div className="col-md-12">
              Level 1: .col-md-12
              <div className="row show-grid">
                <div className="col-md-6">Level 2: .col-md-6</div>
                <div className="col-md-6">Level 2: .col-md-6</div>
              </div>
            </div>
          </div>
        </div>
        <hr className="simple" />
        <div className="well">
          <h1>Responsive utilities</h1>
          <p className="alert alert-info">
            <strong>
              For faster mobile-friendly development, use these utility classes
              for showing and hiding content by device via media query. Also
              included are utility classes for toggling content when printed.
            </strong>
          </p>
          <p>
            Try to use these on a limited basis and avoid creating entirely
            different versions of the same site. Instead, use them to complement
            each device's presentation.
            <strong>
              Responsive utilities are currently only available for block and
              table toggling.
            </strong>
            Use with inline and table elements is currently not supported.
          </p>
          <h3>Available classes</h3>
          <p>
            Use a single or combination of the available classes for toggling
            content across viewport breakpoints.
          </p>
          <table className="table table-bordered table-striped responsive-utilities">
            <thead>
              <tr>
                <th />
                <th>
                  Extra small devices
                  <small>Phones (&lt;768px)</small>
                </th>
                <th>
                  Small devices
                  <small>Tablets (≥768px)</small>
                </th>
                <th>
                  Medium devices
                  <small>Desktops (≥992px)</small>
                </th>
                <th>
                  Large devices
                  <small>Desktops (≥1200px)</small>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <code>.visible-xs</code>
                </th>
                <td className="is-visible">Visible</td>
                <td className="is-hidden">Hidden</td>
                <td className="is-hidden">Hidden</td>
                <td className="is-hidden">Hidden</td>
              </tr>
              <tr>
                <th>
                  <code>.visible-sm</code>
                </th>
                <td className="is-hidden">Hidden</td>
                <td className="is-visible">Visible</td>
                <td className="is-hidden">Hidden</td>
                <td className="is-hidden">Hidden</td>
              </tr>
              <tr>
                <th>
                  <code>.visible-md</code>
                </th>
                <td className="is-hidden">Hidden</td>
                <td className="is-hidden">Hidden</td>
                <td className="is-visible">Visible</td>
                <td className="is-hidden">Hidden</td>
              </tr>
              <tr>
                <th>
                  <code>.visible-lg</code>
                </th>
                <td className="is-hidden">Hidden</td>
                <td className="is-hidden">Hidden</td>
                <td className="is-hidden">Hidden</td>
                <td className="is-visible">Visible</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th>
                  <code>.hidden-xs</code>
                </th>
                <td className="is-hidden">Hidden</td>
                <td className="is-visible">Visible</td>
                <td className="is-visible">Visible</td>
                <td className="is-visible">Visible</td>
              </tr>
              <tr>
                <th>
                  <code>.hidden-sm</code>
                </th>
                <td className="is-visible">Visible</td>
                <td className="is-hidden">Hidden</td>
                <td className="is-visible">Visible</td>
                <td className="is-visible">Visible</td>
              </tr>
              <tr>
                <th>
                  <code>.hidden-md</code>
                </th>
                <td className="is-visible">Visible</td>
                <td className="is-visible">Visible</td>
                <td className="is-hidden">Hidden</td>
                <td className="is-visible">Visible</td>
              </tr>
              <tr>
                <th>
                  <code>.hidden-lg</code>
                </th>
                <td className="is-visible">Visible</td>
                <td className="is-visible">Visible</td>
                <td className="is-visible">Visible</td>
                <td className="is-hidden">Hidden</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
