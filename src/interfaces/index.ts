export interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
