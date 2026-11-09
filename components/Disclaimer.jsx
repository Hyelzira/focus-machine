
import React from "react";
import { Link } from "react-router-dom";

const DISCLAIMER_TEXT =
  "Focus Machine is a training tool to practise attention and self-monitoring. It does not diagnose, treat, or cure depression, anxiety, high blood pressure, or any medical or psychological condition. If you are in significant distress or crisis, please contact a qualified professional or local emergency services.";

function Disclaimer({ compact = false }) {
  return (
    <section
      className={`fm-disclaimer ${compact ? "fm-disclaimer--compact" : ""}`}
      aria-labelledby="fm-disclaimer-title"
    >
      <div className="fm-disclaimer__icon" aria-hidden="true">
        <span>i</span>
      </div>

      <div className="fm-disclaimer__content">
        <h3 id="fm-disclaimer-title">A gentle reminder</h3>

        <p>{DISCLAIMER_TEXT}</p>

        {!compact && (
          <Link to="/safety" className="fm-disclaimer__link">
            Safety information & support
            <span aria-hidden="true"> ↗</span>
          </Link>
        )}
      </div>
    </section>
  );
}

export default Disclaimer;
