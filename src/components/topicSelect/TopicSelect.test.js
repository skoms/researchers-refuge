import { renderComponent } from '../../utils/testing';
import TopicSelect from './TopicSelect';

describe('TopicSelect', () => {
  
  describe('use: header', () => {
    const options = {
      needsStore: true,
      expectedProps: {
        use: 'header'
      },
    }
    
    it('should render without any errors', () => {
      const { getByRole } = renderComponent(TopicSelect, options);
      expect(
        getByRole('combobox')
      ).toBeInTheDocument();
    });
    
    it('should initially render with home as the default value', () => {
      const { getByRole } = renderComponent(TopicSelect, options);
      expect(
        getByRole('option')
      ).toHaveValue('home');
    });

  })
  
  describe('use: ArticleForm', () => {
    const options = {
      needsStore: true,
      expectedProps: {
        use: 'ArticleForm'
      },
    }

    it('should render without any errors', () => {
      const { getByRole } = renderComponent(TopicSelect, options);
      expect(
        getByRole('combobox')
      ).toBeInTheDocument();
    });
    
    it('should initially render with none as the default value', async () => {
      const { getByRole } = renderComponent(TopicSelect, options);
      expect(
        getByRole('option')
      ).toHaveValue('none');
    });
    
  })

})


