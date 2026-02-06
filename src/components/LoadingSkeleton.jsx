import { colors } from '../styles/design-system'

const css = `
  .skeleton-container {
    min-height: 100vh;
    background: ${colors.bg};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 32px;
  }
  .skeleton-card {
    background: ${colors.white};
    border: 1px solid ${colors.border};
    border-radius: 18px;
    padding: 48px;
    max-width: 600px;
    width: 100%;
  }
  .skeleton-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
  }
  .skeleton-avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
  }
  .skeleton-title {
    flex: 1;
    height: 24px;
    border-radius: 6px;
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
  }
  .skeleton-line {
    height: 16px;
    border-radius: 4px;
    background: linear-gradient(
      90deg,
      #f0f0f0 25%,
      #e0e0e0 50%,
      #f0f0f0 75%
    );
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s ease-in-out infinite;
    margin-bottom: 12px;
  }
  .skeleton-line.short {
    width: 60%;
  }
  .skeleton-line.medium {
    width: 80%;
  }
  .skeleton-line.long {
    width: 100%;
  }
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`

export default function LoadingSkeleton() {
  return (
    <>
      <style>{css}</style>
      <div className="skeleton-container">
        <div className="skeleton-card">
          <div className="skeleton-header">
            <div className="skeleton-avatar" />
            <div className="skeleton-title" />
          </div>
          <div className="skeleton-line long" />
          <div className="skeleton-line medium" />
          <div className="skeleton-line short" />
          <div className="skeleton-line long" style={{ marginTop: '24px' }} />
          <div className="skeleton-line medium" />
        </div>
      </div>
    </>
  )
}
