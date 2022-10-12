
import { Directive,ElementRef, OnInit ,HostListener,Input} from '@angular/core';

@Directive({
  selector: '[appChecknum]'
})
export class ChecknumDirective implements OnInit{

  @Input() defaultValue : any ;

  constructor(private elRef:ElementRef) { 
   
    


  }
  ngOnInit() {
    this.elRef.nativeElement.value=this.defaultValue;
   
  }
  @HostListener('keyup') onkeyup(){
    if(this.elRef.nativeElement.value<0 ||this.elRef.nativeElement.value >10){
      this.elRef.nativeElement.style.background="red"
    }
    else{
      this.elRef.nativeElement.style.background="green"
    }

  }

}
