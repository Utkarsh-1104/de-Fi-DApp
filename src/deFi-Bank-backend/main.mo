import Debug "mo:base/Debug";
import Float "mo:base/Float";
import Time "mo:base/Time";
actor Dbank {
  Debug.print("Hello World");

  stable var bal: Float = 300;  // mutable variable
  stable var startTime = Time.now();

  let id = 665465146546546546;  // immutable variable

  Debug.print(debug_show(bal));
  Debug.print(debug_show(id)); 

  public func topUp(amount: Float) {
    bal += amount;
    Debug.print(debug_show(bal));
  };  

  public func withdraw(amount: Float) {
    if (bal >= amount) {
      bal -= amount;
      Debug.print(debug_show(bal));
    } else {  
      Debug.print("Insufficient balance");
    }
  };

  public query func getBalance(): async Float {
    return bal;
  };

  public func compund() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapseS = timeElapsedNS / 1000000000;
    bal := bal * (1.01 ** Float.fromInt(timeElapseS));
  }

  //topUp();
} 