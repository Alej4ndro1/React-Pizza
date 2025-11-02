import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}>
    <circle
      cx="140"
      cy="125"
      r="125"
    />
    <rect
      x="20"
      y="260"
      rx="10"
      ry="10"
      width="240"
      height="30"
    />
    <rect
      x="0"
      y="310"
      rx="10"
      ry="10"
      width="280"
      height="90"
    />
    <rect
      x="0"
      y="420"
      rx="10"
      ry="10"
      width="90"
      height="30"
    />
    <rect
      x="130"
      y="410"
      rx="25"
      ry="25"
      width="150"
      height="45"
    />
  </ContentLoader>
);

export default Skeleton;
