//TODO - CHANGE OUT PLACEHOLDERS
//TODO - MAKE SURE TO HOOK UP ALL LINKS

import InfoModule from "../../infoModule/InfoModule";
import RelatedArticles from "./relatedArticles/RelatedArticles";

// TEMPORARY VARIABLE
let isOwner = true;

const ArticleDetails = props => {
  return (
    <div className="content-article-details">
      
      <div className="article-details-sidebar">
        <InfoModule />
        <RelatedArticles />
      </div>
      
      <div className="article-div"> 
        
        { isOwner 
        ? 
          <a href={`/articles/${props.match.params.id}/update`}><button className='button-primary'>Edit Article</button></a>
        :
          <></>
        }
        
        <h1>WHAT IS ARTIFICIAL INTELLIGENCE?</h1> 
        
        <div className="article-header">
          <a href={`/users/`/* ADD USER ID HERE */}>John McCarthy</a>
          <p>12/11-2007</p>
        </div>
        
        <p className="article-intro">This article for the layman answers basic questions about artificial intelligence. The opinions expressed here are not all consensus opinion among researchers in AI.</p>
        
        <p className="article-body">Q. What is artificial intelligence?
A. It is the science and engineering of making intelligent machines, especially intelligent computer programs. It is related to the similar task of
using computers to understand human intelligence, but AI does not have to
confine itself to methods that are biologically observable.
Q. Yes, but what is intelligence?
A. Intelligence is the computational part of the ability to achieve goals in
the world. Varying kinds and degrees of intelligence occur in people, many
animals and some machines.
Q. Isn’t there a solid definition of intelligence that doesn’t depend on
relating it to human intelligence?
2
A. Not yet. The problem is that we cannot yet characterize in general
what kinds of computational procedures we want to call intelligent. We
understand some of the mechanisms of intelligence and not others.
Q. Is intelligence a single thing so that one can ask a yes or no question
“Is this machine intelligent or not?”?
A. No. Intelligence involves mechanisms, and AI research has discovered
how to make computers carry out some of them and not others. If doing a
task requires only mechanisms that are well understood today, computer programs can give very impressive performances on these tasks. Such programs
should be considered “somewhat intelligent”.
Q. Isn’t AI about simulating human intelligence?
A. Sometimes but not always or even usually. On the one hand, we can
learn something about how to make machines solve problems by observing
other people or just by observing our own methods. On the other hand, most
work in AI involves studying the problems the world presents to intelligence
rather than studying people or animals. AI researchers are free to use methods that are not observed in people or that involve much more computing
than people can do.
Q. What about IQ? Do computer programs have IQs?
A. No. IQ is based on the rates at which intelligence develops in children.
It is the ratio of the age at which a child normally makes a certain score
to the child’s age. The scale is extended to adults in a suitable way. IQ
correlates well with various measures of success or failure in life, but making
computers that can score high on IQ tests would be weakly correlated with
their usefulness. For example, the ability of a child to repeat back a long
sequence of digits correlates well with other intellectual abilities, perhaps
because it measures how much information the child can compute with at
once. However, “digit span” is trivial for even extremely limited computers.
However, some of the problems on IQ tests are useful challenges for AI.
Q. What about other comparisons between human and computer intelligence?
Arthur R. Jensen [Jen98], a leading researcher in human intelligence,
suggests “as a heuristic hypothesis” that all normal humans have the same
intellectual mechanisms and that differences in intelligence are related to
“quantitative biochemical and physiological conditions”. I see them as speed,
short term memory, and the ability to form accurate and retrievable long term
memories.
Whether or not Jensen is right about human intelligence, the situation in
3
AI today is the reverse.
Computer programs have plenty of speed and memory but their abilities
correspond to the intellectual mechanisms that program designers understand
well enough to put in programs. Some abilities that children normally don’t
develop till they are teenagers may be in, and some abilities possessed by
two year olds are still out. The matter is further complicated by the fact
that the cognitive sciences still have not succeeded in determining exactly
what the human abilities are. Very likely the organization of the intellectual
mechanisms for AI can usefully be different from that in people.
Whenever people do better than computers on some task or computers
use a lot of computation to do as well as people, this demonstrates that the
program designers lack understanding of the intellectual mechanisms required
to do the task efficiently.</p> 
        
        
        <div className="nav-buttons">

          { parseInt(props.match.params.id) !== 1 
          ?
            <a className="prev" href={`/articles/${parseInt(props.match.params.id) - 1}`}>
              { localStorage.getItem('darkmode') === 'true' 
              ?
                <img src="https://img.icons8.com/ios/50/38B6FF/circled-chevron-left.png" alt="previous button"/>
              :
                <img src="https://img.icons8.com/ios/50/000000/circled-chevron-left.png" alt="previous button"/>
              }
            </a>
          :
            <a href="/"> </a>
          }
          

          <a className="home" href='/'>
            { localStorage.getItem('darkmode') === 'true' 
              ?
                <img src="https://img.icons8.com/ios/64/38B6FF/home-page.png" alt="home button"/>
              :
                <img src="https://img.icons8.com/ios/64/000000/home-page.png" alt="home button"/>
            }
          </a>

          <a className="next" href={`/articles/${parseInt(props.match.params.id) + 1}`}>
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
