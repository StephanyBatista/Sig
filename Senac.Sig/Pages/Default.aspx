<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />
    
    <link href="../Content/bootstrap.css" rel="stylesheet">
    <link href="../Content/bootstrap-theme.css" rel="stylesheet">
    <link href="../Content/app.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 
    <script src="../Scripts/Chart.PieceLabel.min.js"></script>
    <!-- Add your CSS styles to the following file -->
    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript">

        $('#s4-ribbonrow').remove();

        $(function () {

            $('#suiteBarDelta').css('display', 'none');
            $('#s4-ribbonrow').css('display', 'none');
            $('#siteIcon').css('display', 'none');
        });
    </script>
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <nav class="navbar navbar-default navbar-static-top">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">
                    <img src="../images/senac_logo.png" width="110" alt="Imagem: logo do Senac"/>
                </a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav">
                    <li><a href="#noticias">Notícias</a></li>
                    <li><a href="#graficos">Gráficos</a></li>
                    <li><a href="#tarefas">Tarefas</a></li>
                    <li><a href="#documentos">Documentos</a></li>
                </ul>                     
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="https://www.facebook.com/senac" class="btn"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="https://twitter.com/senacbrasil" class="btn"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>         
                    <li><a href="https://www.linkedin.com/company-beta/165919/" class="btn"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>         
                    <li><a href="https://www.youtube.com/user/senacms" class="btn"><i class="fa fa-youtube" aria-hidden="true"></i></a></li>                               
                </ul>                      
            </div><!-- /.navbar-collapse -->  
        </div>
    </nav>        
    <div class="container-fluid">

        <section class="gray-container container-padding" id="noticias">
            <div class="container alert">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="title">Notícias - Sistema Integrado de Gestão - SIG</h2>
                        <div class="row">
                            <div class="col-md-12">
                                <div id="noticiasDiv" class="list-group">
                                </div>                        
                            </div>
                            <div class="col-md-12">
                                <div class="pull-right">
                                    <button type="button" class="btn btn-link hidden" id="verMais" onclick="populateAvisos(false)">
                                        <i class="glyphicon glyphicon-plus"></i> Ver mais
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>                
        </section>

        <section class="blue-container container-padding" id="graficos">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="title-white">Gráficos de acompanhamento de projetos</h2>
                        <div class="row">
                            <div class="col-md-6">
                                <canvas id="progressoTotalDoProjeto" width="auto" height="200"></canvas>
                            </div>
                            <div class="col-md-6">
                                <canvas id="progressoDetalhadoDoProjeto" width="auto" height="200"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="gray-container container-padding" id="tarefas">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="title">Principais tarefas</h2>
                        <div class="row">
                            <div class="col-md-12">
                                <table id="projetosTable" class="table">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome do item</th>
                                        <th>% Concluido</th>                                        
                                        <th>Status do item</th>
                                        <th>Atribuido a</th>
                                        <th>Data de início</th>
                                        <th>Data de conclusão</th>
                                    </tr>                                    
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="gray-container container-padding" id="documentos">
            <div class="container">                
                <div class="row">
                    <div class="col-md-12">
                        <h2 class="title">Documentos</h2>
                        <div class="row">
                            <div class="col-md-12">

                                <table id="documentosTable" class="table">
                                    <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th></th>
                                    </tr>                                    
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>                            

                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        </section>
    </div>
    
    <footer class="footerSig">
        <div class="container">
            <div class="row">
                <div class="col-md-4 padding-top-footer-20">
                    <a class="navbar-brand" href="#">
                        <img src="../images/senac_logo_branco.png" width="100" alt="Imagem: logo do Senac"/>
                    </a>                        
                </div>
                <div class="col-md-4 padding-top-footer-60">
                    <p>Todos os direitos reservados</p>
                </div>
                <div class="col-md-4 padding-top-footer-50">
                    <a type="button" href="https://www.facebook.com/senac" class="btn btn-default btn-footer">
                        <i class="fa fa-facebook" aria-hidden="true"></i>
                    </a>
                    <a type="button" href="https://twitter.com/senacbrasil" class="btn btn-default btn-footer">
                        <i class="fa fa-twitter" aria-hidden="true"></i>
                    </a>
                    <a type="button" href="https://www.linkedin.com/company-beta/165919/" class="btn btn-default btn-footer">
                        <i class="fa fa-linkedin" aria-hidden="true"></i>
                    </a>
                    <a type="button" href="https://www.youtube.com/user/senacms" class="btn btn-default btn-footer">
                        <i class="fa fa-youtube" aria-hidden="true"></i>
                    </a> 
                </div>                                        
            </div>
        </div>
    </footer> 
</asp:Content>
