//TODO - CHANGE OUT PLACEHOLDERS

import InfoModule from "../../infoModule/InfoModule";

const ArticleDetails = () => {
  return (
    <div className="content-article-details">
      <div className="author-details">
        <InfoModule />
      </div>
      <div className="article-div"> 
        <h1>California Attorney General says popular, digital ad opt-outs from trade groups don’t comply with CCPA</h1> 
        <p className="article-date-of-release">2012-08-23</p>
        <p className="article-intro">For more than a year advertisers and publishers had few clues for detecting how California regulators would enforce the state’s privacy law. Now, subtle and not-so-subtle indicators are emerging in enforcement letters and case examples from the state’s Office of the Attorney General.</p>
        <p className="article-body">California Attorney General Rob Bonta’s office unveiled in mid-July several examples of CCPA enforcement cases, allaying some lamentations about a lack of rules and guidance associated with the law, which went into effect in January 2020. “As a law enforcement agency, the OAG does not generally release information to the public about its investigations,” wrote the AG’s office when it released nearly 30 industry-specific case examples scrubbed of actual company names and other revealing details. “The OAG provides the information below as illustrative examples of situations in which it sent a notice of alleged noncompliance and steps taken by each company in response,” the OAG continued. </p> 
        <div className="nav-buttons">
          <button className="prev">
            <img src="https://img.icons8.com/ios/50/000000/circled-chevron-left.png" alt="previous button"/>
          </button>
          <button className="home">
            <img src="https://img.icons8.com/windows/64/000000/home-page.png" alt="home button"/>
          </button>
          <button className="next">
            <img src="https://img.icons8.com/ios/50/000000/circled-chevron-right.png" alt="next button"/>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetails
