//TODO - CHANGE OUT PLACEHOLDERS
//TODO - MAKE SURE TO HOOK UP ALL LINKS

import InfoModule from "../../infoModule/InfoModule";
import RelatedArticles from "./relatedArticles/RelatedArticles";

const ArticleDetails = () => {
  return (
    <div className="content-article-details">
      <div className="article-details-sidebar">
        <InfoModule />
        <RelatedArticles />
      </div>
      <div className="article-div"> 
        <h1>California Attorney General says popular, digital ad opt-outs from trade groups don’t comply with CCPA</h1> 
        <div className="article-header">
          <a href={`/users/`/* ADD USER ID HERE */}>Kari Nordmann</a>
          <p>23/8-2012</p>
        </div>
        <p className="article-intro">For more than a year advertisers and publishers had few clues for detecting how California regulators would enforce the state’s privacy law. Now, subtle and not-so-subtle indicators are emerging in enforcement letters and case examples from the state’s Office of the Attorney General.</p>
        <p className="article-body">California Attorney General Rob Bonta’s office unveiled in mid-July several examples of CCPA enforcement cases, allaying some lamentations about a lack of rules and guidance associated with the law, which went into effect in January 2020. “As a law enforcement agency, the OAG does not generally release information to the public about its investigations,” wrote the AG’s office when it released nearly 30 industry-specific case examples scrubbed of actual company names and other revealing details. “The OAG provides the information below as illustrative examples of situations in which it sent a notice of alleged noncompliance and steps taken by each company in response,” the OAG continued. </p> 
        <div className="nav-buttons">
          <a className="prev" href="/">
            { localStorage.getItem('darkmode') === 'true' 
            ?
              <img src="https://img.icons8.com/ios/50/38B6FF/circled-chevron-left.png" alt="previous button"/>
            :
              <img src="https://img.icons8.com/ios/50/000000/circled-chevron-left.png" alt="previous button"/>
            }
          </a>
          <a className="home" href="/">
            { localStorage.getItem('darkmode') === 'true' 
              ?
                <img src="https://img.icons8.com/ios/64/38B6FF/home-page.png" alt="home button"/>
              :
                <img src="https://img.icons8.com/ios/64/000000/home-page.png" alt="home button"/>
            }
          </a>
          <a className="next" href="/">
            { localStorage.getItem('darkmode') === 'true' 
              ?
                <img src="https://img.icons8.com/ios/50/38B6FF/circled-chevron-right.png" alt="next button"/>
              :
                <img src="https://img.icons8.com/ios/50/000000/circled-chevron-right.png" alt="next button"/>
            }
          </a>
        </div>
      </div>
    </div>
  )
}

export default ArticleDetails
