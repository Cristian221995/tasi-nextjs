import PropTypes from "prop-types";
import classNames from "classnames";

const Layout = ({ children, title }) => {
  return (
    <div className="custom-container">
      <div className="container border w-75 bg-light">
        <main className="py-4">
          {title && <h3 className={classNames("text-center")}>{title}</h3>}
          {children}
        </main>
      </div>
    </div>
  );
};

Layout.proptypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Layout;
