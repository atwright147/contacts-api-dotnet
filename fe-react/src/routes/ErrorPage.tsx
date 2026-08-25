export function ErrorPage() {
  const error = '';
  console.error(error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        {/* @ts-ignore */}
        <em>{error.statusText || error.message}</em>
      </p>
    </div>
  );
}
