import React, { useContext } from 'react';
import {
  Button, Card, Badge, Col,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import ReactMarkdown from 'react-markdown';

const styles = {
  badgeStyle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 5,
  },
  cardStyle: {
    borderRadius: 10,
  },
  cardTitleStyle: {
    fontSize: 24,
    fontWeight: 700,
  },
  cardTextStyle: {
    textAlign: 'left',
  },
  linkStyle: {
    textDecoration: 'none',
    padding: 10,
  },
  buttonStyle: {
    margin: 5,
  },
};

const ProjectCard = ({ project }) => {
  const {
    cardBackground,
    cardBorderColor,
    bsSecondaryVariant,
    cardFooterBackground,
    bsPrimaryVariant,
  } = useContext(ThemeContext);
  const parseBodyText = (text) => <ReactMarkdown children={text} />;

  if (!project) {
    return null; // Render nothing if project is null
  }

  const {
    image,
    title,
    bodyText,
    links,
    tags,
  } = project;

  return (
    <Col>
      <Card
        style={{
          ...styles.cardStyle,
          backgroundColor: cardBackground,
          borderColor: cardBorderColor,
        }}
        text={bsSecondaryVariant}
      >
        {image && <Card.Img variant="top" src={image} />}
        <Card.Body>
          <Card.Title style={styles.cardTitleStyle}>{title}</Card.Title>
          <Card.Text style={styles.cardTextStyle}>
            {parseBodyText(bodyText)}
          </Card.Text>
        </Card.Body>

        {links && (
          <Card.Body>
            {links.map(({ href, text }) => (
              <Button
                key={href}
                style={styles.buttonStyle}
                variant={`outline-${bsSecondaryVariant}`}
                onClick={() => window.open(href, '_blank')}
              >
                {text}
              </Button>
            ))}
          </Card.Body>
        )}

        {tags && (
          <Card.Footer style={{ backgroundColor: cardFooterBackground }}>
            {tags.map((tag) => (
              <Badge
                key={tag}
                pill
                bg={bsSecondaryVariant}
                text={bsPrimaryVariant}
                style={styles.badgeStyle}
              >
                {tag}
              </Badge>
            ))}
          </Card.Footer>
        )}
      </Card>
    </Col>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    bodyText: PropTypes.string.isRequired,
    image: PropTypes.string,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
      }),
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default ProjectCard;
