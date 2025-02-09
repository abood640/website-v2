import React from 'react';
import { useI18next, Trans } from 'gatsby-plugin-react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import { useLocation } from '@reach/router';
import Flag from 'react-world-flags'
import ISO6391 from 'iso-639-1';
import './LanguageSelector.scss';

const LanguageSelector = (): JSX.Element => {
  const {languages, changeLanguage} = useI18next();
  const location = useLocation();

  function ISO3166(lng: string) {
    // Convert locale to ISO 3166-1 alpha-2 https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
    switch(lng) {
      case 'en':
        return 'gb';
      case 'zh-CN':
        return 'cn';
      default:
        return lng;
    }
  }

  function ISO639(lng: string) {
    // Convert locale to ISO 639-1 alpha-2 https://en.wikipedia.org/wiki/ISO_639-1_alpha-2
    switch(lng) {
      case 'zh-CN':
        return 'zh';
      default:
        return lng;
    }
  }

  return (
    <div className="App lngg">
      <Form>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-flags" className="text-left text-white">
            <Trans>Change Language</Trans>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {languages.map((lng) => (
              <a
                href=""
                key={lng}
                onClick={(e) => {
                  e.preventDefault();
                  if (location.pathname.includes('index')) {
                    let newPath = location.pathname.split("/index")[0].slice(3)
                    changeLanguage(lng, newPath);
                  } else {
                    changeLanguage(lng);
                  }
                }}>
                <Dropdown.Item key={lng} eventKey={lng}>
                  <Flag code={ISO3166(lng)} width="35" /> 
                  {ISO6391.getNativeName(ISO639(lng))}
                </Dropdown.Item>
              </a>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Form>
    </div>
  );
};

export default LanguageSelector;
