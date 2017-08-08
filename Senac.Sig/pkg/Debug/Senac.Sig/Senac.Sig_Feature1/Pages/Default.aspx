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

            $('#suiteBarDelta').remove();
            $('#s4-ribbonrow').remove();
            $('#siteIcon').remove();
            $('#s4-titlerow').remove();
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
                        <div class="list-group">
                            <a href="#" class="list-group-item">
                                <h4 class="list-group-item-heading"><strong>List group item heading</strong></h4>
                                <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            </a>
                            <a href="#" class="list-group-item">
                                <h4 class="list-group-item-heading"><strong>List group item heading</strong></h4>
                                <p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            </a>
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
                        <canvas id="myChart" width="auto" height="100"></canvas>
                    </div>
                    <div class="col-md-6"></div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <h2>Principais tarefas</h2>
                <hr/>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Gerência</th>
                                <th>Programa</th>
                                <th>Nome do item</th>
                                <th>% Concluido</th>                                        
                                <th>Status do item</th>
                                <th>Atribuido a</th>
                                <th>Data de início</th>
                                <th>Data de conclusão</th>
                                <th>Data real de conclusão</th>
                            </tr>                                    
                            </thead>
                            <tbody>
                            <tr>
                                <td>1</td>
                                <td>GESIM</td>
                                <td>MIRA</td>
                                <td>PID - Desenvolvimento</td>
                                <td>100</td>
                                <td>Concluído</td>
                                <td>Neila Aparecida S. do Nascimento</td>
                                <td>21 de Dezembro de 2016</td>
                                <td>24 de Janeiro</td>
                                <td>24 de Janeiro</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>GESIM</td>
                                <td>MIRA</td>
                                <td>PID - Desenvolvimento</td>
                                <td>100</td>
                                <td>Concluído</td>
                                <td>Neila Aparecida S. do Nascimento</td>
                                <td>21 de Dezembro de 2016</td>
                                <td>24 de Janeiro</td>
                                <td>24 de Janeiro</td>
                            </tr>
                            <tr>
                                <td>1</td>
                                <td>GESIM</td>
                                <td>MIRA</td>
                                <td>PID - Desenvolvimento</td>
                                <td>100</td>
                                <td>Concluído</td>
                                <td>Neila Aparecida S. do Nascimento</td>
                                <td>21 de Dezembro de 2016</td>
                                <td>24 de Janeiro</td>
                                <td>24 de Janeiro</td>
                            </tr>                                                                        
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

                        <table class="table">
                            <thead>
                            <tr>
                                <th>Nome</th>
                                <th></th>
                            </tr>                                    
                            </thead>
                            <tbody>
                            <tr>
                                <td>EDITAL CC022017 - GECOM</td>
                                <td>
                                    <button class="btn btn-default btn-xs">
                                        <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>                                                                       
                            </tbody>
                        </table>                            

                    </div>
                </div>
            </div>
        </div>            

    </div>
    <script>
        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [{
                    label: '# of Votes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(246, 140, 31, 0.8)'
                    ],
                    borderColor: [
                        'rgba(246, 140, 31, 0.4)',
                        'rgba(246, 140, 31, 0.4)',
                        'rgba(246, 140, 31, 0.4)',
                        'rgba(246, 140, 31, 0.4)',
                        'rgba(246, 140, 31, 0.4)',
                        'rgba(246, 140, 31, 0.4)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    </script>

</asp:Content>
