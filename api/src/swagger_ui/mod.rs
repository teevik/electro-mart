use poem::{endpoint::make_sync, web::Html, Endpoint};

const SWAGGER_UI_JS: &str = include_str!("swagger-ui-bundle.js");
const SWAGGER_UI_CSS: &str = include_str!("swagger-ui.css");

const SWAGGER_UI_TEMPLATE: &str = r#"
<html charset="UTF-8">
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8">
    <title>Swagger UI</title>
    <style charset="UTF-8">{:style}</style>
    <script charset="UTF-8">{:script}</script>
</head>
<body>

<div id="ui"></div>
<script>
    SwaggerUIBundle({
        url: "{:url}",
        dom_id: '#ui',
        filter: false,
        deepLinking: true,
        persistAuthorization: true,
    })
</script>

</body>
</html>
"#;

fn create_html(url: &str) -> String {
    SWAGGER_UI_TEMPLATE
        .replace("{:style}", SWAGGER_UI_CSS)
        .replace("{:script}", SWAGGER_UI_JS)
        .replace("{:url}", url)
}

pub fn create_endpoint(url: &str) -> impl Endpoint {
    let ui_html = create_html(url);
    poem::Route::new().at("/", make_sync(move |_| Html(ui_html.clone())))
}
