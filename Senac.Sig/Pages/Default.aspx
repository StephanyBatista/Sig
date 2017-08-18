<%-- The following 4 lines are ASP.NET directives needed when using SharePoint components --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- The markup and script in the following Content element will be placed in the <head> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.9.1.min.js"></script>
    <SharePoint:ScriptLink name="sp.js" runat="server" OnDemand="true" LoadAfterUI="true" Localizable="false" />
    <meta name="WebPartPageExpansion" content="full" />
    
    <link href="../Content/bootstrap.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.min.js"></script>
    <!-- Add your CSS styles to the following file -->
    <!-- Add your JavaScript to the following file -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
    <script type="text/javascript">
        $(function() {

            $('#suiteBarDelta').css('display', 'none');
            $('#s4-ribbonrow').css('display', 'none');
            $('#siteIcon').css('display', 'none');
        });
    </script>
</asp:Content>

<%-- The markup and script in the following Content element will be placed in the <body> of the page --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <img src="../images/banner_senac.png" alt="Banner Senac"/>
            </div>
        </div>            
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h2>Notícias - Sistema integrado de Gestão - SIG</h2>
                <hr/>
                <div class="row">
                    <div class="col-md-12">
                        <div id="noticiasDiv" class="list-group">
                            
                        </div>                        
                    </div>
                    <div class="col-md-6"></div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h2>Gráficos de acompanhamento de projetos</h2>
                <hr/>
                <div class="row">
                    <div class="col-md-6">
                        <canvas id="progressoTotalDoProjeto" width="auto" height="100"></canvas>
                    </div>
                    <div class="col-md-6">
                        <canvas id="progressoDetalhadoDoProjeto" width="auto" height="100"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h2>Principais tarefas</h2>
                <hr/>
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
            
        <div class="row">
            <div class="col-md-12">
                <h2>Documentos</h2>
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
    <script>
        
    </script>

</asp:Content>
