import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from '../all.service';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-result-page',
  templateUrl: './result-page.component.html',
  styleUrls: ['./result-page.component.scss']
})
export class ResultPageComponent implements OnInit {
  resultData: any = []
  page: any
  isLoading = false

  constructor(private request: RequestService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( (params: any) => {
      this.isLoading = true
      this.request.getResultReq(params.id).subscribe(response => {
        this.resultData = response
        this.isLoading = false
      }, error => {
        this.isLoading = false
        if(error.status == '401') {
          this.request.refreshToken().subscribe( (response: any) =>  {
            localStorage.setItem('access_token', response.access_token)
            this.isLoading = false
            location.reload()
            localStorage.clear()
          }, errorToken => {
            this.isLoading = false
            alert(errorToken.message)
            localStorage.clear()
            location.reload()
          })
        } else {
          this.isLoading = false
          alert(error.message)
        }
      })
    })
  }

  toPdf() {
    this.isLoading = true
    const dashboard: any = document.getElementById('dashboard');

    const dashboardHeight = dashboard.clientHeight;
    const dashboardWidth = dashboard.clientWidth;
    const options = { background: 'white', width: dashboardWidth * 2, height: dashboardHeight };

    domtoimage.toPng(dashboard, options).then((imgData: any) => {
         const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
         const imgProps = doc.getImageProperties(imgData);
         const pdfWidth = doc.internal.pageSize.getWidth();
         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

         doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
         doc.save('Протокол.pdf');
         this.isLoading = false
    });
  }
}
