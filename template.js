export default ({markup, css}) => {
    return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,300,400">
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
            <title>Document</title>
            <style>
                a{
                    text-decoration: none;
                    color: #061d95
                }
            </style>
        </head>
        <body style="margin:0">
            <div id="root">${markup}</div>
            <style id="jss-server-side">${css}</style>
            <script type="text/javascript" src="/dist/bundle.js"></script>
        </body>
        </html>`
}