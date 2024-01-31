import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AlertController, GestureController, IonCard, IonItem } from '@ionic/angular';
import { addIcons } from 'ionicons';


addIcons({
  'interviews': 'assets/icon/inter.svg',
  'topinterviews': 'assets/icon/topinterviews.svg',
  'clndr': 'assets/icon/Calendr.svg',
  'job': 'assets/icon/job.svg',
  'like': 'assets/icon/like.svg',
  'dislike': 'assets/icon/dislike.svg',
});

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChildren(IonCard, {read: ElementRef}) items: QueryList<ElementRef> | any;
  @ViewChild('DApplied') dropApplied: ElementRef | any;
   @ViewChild('DShortlisted') dropShortlisted:  ElementRef | any;
   @ViewChild('DInterviewed') dropInterviewed:  ElementRef | any;
   @ViewChild('DOffered') dropOffered:  ElementRef | any;
   @ViewChild('DFinalized') dropFinalized:  ElementRef | any;


  card_employees  = [ 
    { name: "1Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Applied" },
    { name: "2Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Applied" },
    { name: "3Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Shortlisted" },
    { name: "4Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Shortlisted" },    { name: "5Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Interviewed" },
    { name: "6Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Interviewed" },
    { name: "7Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Offered" },
    { name: "9Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Finalized" },
    { name: "10Khalil Alradhed2", contry: "Bahrain", job: "Human Resourse", url: '/assets/profile.png',status:"Finalized" },
  
  ];
  gesturearray: any[] = [];
  moving =true;
  constructor(private alertController: AlertController,private gestureCtrl: GestureController, private changeDetectorRef: ChangeDetectorRef,private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  Applied_remove(index: number) {
   
    if(this.moving){
      this.card_employees[index].status="Shortlisted";
      }
  }
  isLongPressing = false;
  longPressTimer: any;
  movingFunc: any;
  
  handleMouseDown(i:any) {
    this.isLongPressing = true;
    this.longPressTimer = setTimeout(() => {
      if(this.moving)
      this.presentAlert(i);
    }, 500); // Adjust the timeout duration as needed (1 second in this case)
  }
  
  handleMouseUp() {
    this.isLongPressing = false;
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
    }
  }
  
  @HostListener('document:mouseup', ['$event'])
  handleGlobalMouseUp(event: MouseEvent) {
    // Release long press when the mouse is released anywhere on the document
    this.handleMouseUp();
  }

  async presentAlert(i:any) {
    const alert = await this.alertController.create({
      cssClass: 'custom-alert',
      buttons: [
        {
          
          text: 'Disqualify',
          cssClass: 'alert-button-cancel',
          handler: () => {
            this.Applied_remove(i);
          },
        },
        {
          text: 'Answer',
          cssClass: 'alert-button-confirm',
        },
      ],
    });

    await alert.present();
  }




  ngAfterViewInit(): void { 
    this.updateGestures();

  }
  

  updateGestures(){
    this.movingFunc = setTimeout(() => {
     this.moving=true;
    }, 100);
    this.gesturearray.map(gesture => gesture.destroy());
    this.gesturearray = [];

    const arr = this.items.toArray();
    var scrollingWrapper:any = document.querySelector('.scrolling-wrapper');

    for (let i=0; i<arr.length; i++){  
      
      if(!arr[i].nativeElement.classList.contains('card-employee'))
      continue;
     const oneItem = arr[i];
    const drag = this.gestureCtrl.create({
     el: oneItem.nativeElement,
     threshold: 1,
     gestureName: 'drag',
     onStart: ev =>{
      this.moving=false;
       oneItem.nativeElement.style.transition = '';
       oneItem.nativeElement.style.opacity = '0.8';
       oneItem.nativeElement.style.fontWeight = 'bold';

       this.changeDetectorRef.detectChanges();
       scrollingWrapper.style.overflowX = 'hidden';

       },
     onMove: ev => {
        scrollingWrapper.style.overflowX = 'hidden';

       oneItem.nativeElement.style.transform = `translate(${ev.deltaX}px, ${ev.deltaY}px)`;
       oneItem.nativeElement.style.zIndex = 11;
    
      //  this.checkDropZoneHover(ev.currentX,ev.currentY);
       },
     onEnd: ev => {
      scrollingWrapper.style.overflowX = 'scroll';
       this.handleDrop(oneItem,ev.currentX,ev.currentY,i);
       this.updateGestures();
       }
    });
    drag.enable();
    this.gesturearray.push(drag);
    }
    this.items.changes.subscribe((res:any) =>{
     this.updateGestures();
    });
   }

   isInZone(x:any,y:any,dropzone:any){
    if ( x < dropzone.left || x >= dropzone.right ){
     return false;
    }
    if ( y < dropzone.top || y >= dropzone.bottom ){
     return false;
    }
  return true;
  }

  handleDrop(item:any, endX:any, endY:any, index:any){

    const dropApplied = this.dropApplied.nativeElement.getBoundingClientRect();
    const dropShortlisted = this.dropShortlisted.nativeElement.getBoundingClientRect();
    const dropInterviewed = this.dropInterviewed.nativeElement.getBoundingClientRect();
    const dropOffered = this.dropOffered.nativeElement.getBoundingClientRect();
    const dropFinalized = this.dropFinalized.nativeElement.getBoundingClientRect();
    item.nativeElement.style.transform = `translate(0,0)`;
   
    if ( this.isInZone(endX,endY,dropApplied)) {   
      this.card_employees[item.nativeElement.id].status="Applied";

    } 
    else if ( this.isInZone(endX,endY,dropShortlisted)) {
      this.card_employees[item.nativeElement.id].status="Shortlisted";
    }
    else if ( this.isInZone(endX,endY,dropInterviewed)) {
      this.card_employees[item.nativeElement.id].status="Interviewed";
    }
    else if ( this.isInZone(endX,endY,dropOffered)) {
      this.card_employees[item.nativeElement.id].status="Offered";
    }
    else if ( this.isInZone(endX,endY,dropFinalized)) {
      this.card_employees[item.nativeElement.id].status="Finalized";
    }
    else {

     item.nativeElement.style.transform = `translate(0,0)`;
    }
   this.cdr.detectChanges();

    this.updateGestures();
   }

}
